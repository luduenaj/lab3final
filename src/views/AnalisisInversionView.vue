<template>
  <NavBar></NavBar>
  <h2 class="mb-3">Análisis de inversiones💹</h2>
  <CargandoPantalla v-if="response === false"></CargandoPantalla>
  <div v-else class="container">
    <div class="row">
      <LineChart class="col-12 col-lg-6"
      :counter="counter"
      :priceThen="priceThen"
      :priceNow="priceNow">
      </LineChart>
      <AnalisisTable class="col-12 col-lg-6"
      :counter="counter"
      :priceThen="priceThen"
      :priceNow="priceNow">
      </AnalisisTable>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LineChart from '@/components/LineChart.vue';
import lab3Api from '@/services/lab3Api';
import cryptoYaApi from '@/services/cryptoyaApi';
import CargandoPantalla from '@/components/CargandoPantalla.vue';
import AnalisisTable from '@/components/AnalisisTable.vue';

export default {
  name: 'AnalisisInversion',
  components: {
    NavBar,
    LineChart,
    CargandoPantalla,
    AnalisisTable,
  },
  data() {
    return {
      counter: { usdc: null, eth: null, btc: null },
      priceThen: { usdc: null, eth: null, btc: null },
      priceNow: { usdc: null, eth: null, btc: null },
    };
  },
  created() {
    this.getPriceThen();
    this.getPriceNow();
  },
  computed: {
    response() {
      if (this.counter.eth === null || this.counter.usdc === null || this.counter.btc === null) {
        return false;
      }
      if (this.priceNow.btc === null || this.priceNow.eth === null || this.priceNow.btc === null) {
        return false;
      }
      // Desactivado por que se pasa 3 caracteres
      // eslint-disable-next-line
      if (this.priceThen.btc === null || this.priceThen.eth === null || this.priceThen.usdc === null) {
        return false;
      }
      return true;
    },
  },
  methods: {
    getPriceThen() {
      lab3Api.getHistorial(this.$store.state.Id).then((response) => {
        const json = response.data;
        json.forEach((element) => {
          if (element.action === 'purchase') {
            if (element.crypto_code === 'usdc') {
              this.priceThen.usdc += parseFloat(element.money);
              this.counter.usdc += parseFloat(element.crypto_amount);
            }
            if (element.crypto_code === 'eth') {
              this.priceThen.eth += parseFloat(element.money);
              this.counter.eth += parseFloat(element.crypto_amount);
            }
            if (element.crypto_code === 'btc') {
              this.priceThen.btc += parseFloat(element.money);
              this.counter.btc += parseFloat(element.crypto_amount);
            }
          }
          if (element.action === 'sale') {
            if (element.crypto_code === 'usdc') {
              this.priceThen.usdc -= parseFloat(element.money);
              this.counter.usdc -= parseFloat(element.crypto_amount);
            }
            if (element.crypto_code === 'eth') {
              this.priceThen.eth -= parseFloat(element.money);
              this.counter.eth -= parseFloat(element.crypto_amount);
            }
            if (element.crypto_code === 'btc') {
              this.priceThen.btc -= parseFloat(element.money);
              this.counter.btc -= parseFloat(element.crypto_amount);
            }
            if (this.counter.btc === null) {
              this.counter.btc = 0;
            }
            if (this.counter.eth === null) {
              this.counter.eth = 0;
            }
            if (this.counter.usdc === null) {
              this.counter.usdc = 0;
            }
          }
        });
      });
    },
    getPriceNow() {
      cryptoYaApi.getBitcoin().then((response) => {
        this.priceNow.btc = response.data.totalAsk;
      });
      cryptoYaApi.getEtherum().then((response) => {
        this.priceNow.eth = response.data.totalAsk;
      });
      cryptoYaApi.getUSDC().then((response) => {
        this.priceNow.usdc = response.data.totalAsk;
      });
    },
  },
};
</script>
