<template>
    <NavBar></NavBar>
    <h1 class="my-5 bold">¡Bienvenido/a {{user.toUpperCase()}}!</h1>
    <PricesTable v-if="response" :eth="this.eth"
    :usdc="this.usdc" :btc="this.btc"></PricesTable>
    <div v-else-if="!response" class="my-5">
      <CargandoPantalla></CargandoPantalla>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import PricesTable from '@/components/PricesTable.vue';
import cryptoyaApi from '@/services/cryptoyaApi';
import CargandoPantalla from '@/components/CargandoPantalla.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    PricesTable,
    CargandoPantalla,
  },
  data() {
    return {
      btc: {},
      eth: {},
      usdc: {},
      user: this.$store.state.Id,
    };
  },
  created() {
    this.obtenerPrecio();
  },
  computed: {
    response() {
      if (this.btc === {} || this.eth === {} || this.usdc === {}) {
        return false;
      }
      return true;
    },
  },
  methods: {
    obtenerPrecio() {
      cryptoyaApi.getBitcoin().then((response) => {
        this.btc = response.data;
      });
      cryptoyaApi.getEtherum().then((response) => {
        this.eth = response.data;
      });
      cryptoyaApi.getUSDC().then((response) => {
        this.usdc = response.data;
      });
    },
  },
};
</script>

<style scoped>
</style>
