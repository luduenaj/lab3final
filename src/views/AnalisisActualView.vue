<template>
  <NavBar></NavBar>
  <h2>Análisis actual💰</h2>
  <div class="container" v-if="response">
    <div v-if="noCoins" class="my-3">
      <h1>No se encontraron monedas🧐</h1>
      <router-link to="/purchase">Compra monedas💲</router-link>
      <br>
    </div>
    <div v-else class="row">
      <DoughtnutChart class="col-lg-6 col-12"
      :usdcCounter="usdcCounter" :ethCounter="ethCounter"
      :btcCounter="btcCounter" :price="price">
      </DoughtnutChart>
      <Analisis class="col-lg-6 col-12"
      :usdcCounter="usdcCounter" :ethCounter="ethCounter"
      :btcCounter="btcCounter" :price="price">
      </Analisis>
    </div>
  </div>
  <CargandoPantalla v-else></CargandoPantalla>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import DoughtnutChart from '@/components/DoughtnutChart.vue';
import lab3Api from '@/services/lab3Api';
import cryptoyaApi from '@/services/cryptoyaApi';
import CargandoPantalla from '@/components/CargandoPantalla.vue';
import Analisis from '@/components/AnalisisBilletera.vue';

export default {
  name: 'AnalisisActual',
  components: {
    NavBar,
    DoughtnutChart,
    CargandoPantalla,
    Analisis,
  },
  data() {
    return {
      price: { btc: null, eth: null, usdc: null },
      usdcCounter: null,
      ethCounter: null,
      btcCounter: null,
      isLoading: true,
    };
  },
  computed: {
    response() {
      if (this.price.btc === null || this.price.eth === null || this.price.usdc === null) {
        return false;
      }
      if (this.usdcCounter === null || this.ethCounter === null || this.btcCounter === null) {
        return false;
      }
      return true;
    },
    noCoins() {
      if (this.usdcCounter === 0 && this.ethCounter === 0 && this.btcCounter === 0) {
        return true;
      }
      return false;
    },
  },
  created() {
    cryptoyaApi.getBitcoin().then((response) => {
      this.price.btc = response.data.totalAsk;
      this.isLoading = false;
    });
    cryptoyaApi.getEtherum().then((response) => {
      this.price.eth = response.data.totalAsk;
      this.isLoading = false;
    });
    cryptoyaApi.getUSDC().then((response) => {
      this.price.usdc = response.data.totalAsk;
      this.isLoading = false;
    });
    lab3Api.getHistorial(this.$store.state.Id).then((response) => {
      const json = response.data;
      this.isLoading = false;
      json.forEach((movimiento) => {
        if (movimiento.action === 'purchase') {
          if (movimiento.crypto_code === 'usdc') {
            this.usdcCounter += parseFloat(movimiento.crypto_amount);
          }
          if (movimiento.crypto_code === 'eth') {
            this.ethCounter += parseFloat(movimiento.crypto_amount);
          }
          if (movimiento.crypto_code === 'btc') {
            this.btcCounter += parseFloat(movimiento.crypto_amount);
          }
        }
        if (movimiento.action === 'sale') {
          if (movimiento.crypto_code === 'usdc') {
            this.usdcCounter -= parseFloat(movimiento.crypto_amount);
          }
          if (movimiento.crypto_code === 'eth') {
            this.ethCounter -= parseFloat(movimiento.crypto_amount);
          }
          if (movimiento.crypto_code === 'btc') {
            this.btcCounter -= parseFloat(movimiento.crypto_amount);
          }
        }
      });
      if (this.btcCounter <= 0) {
        this.btcCounter = 0;
      }
      if (this.ethCounter <= 0) {
        this.ethCounter = 0;
      }
      if (this.usdcCounter <= 0) {
        this.usdcCounter = 0;
      }
    });
  },
};
</script>

<style scoped>
.chartBox {
  width: 100%;
  height: 70vh;
}
</style>
