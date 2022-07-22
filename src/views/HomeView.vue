<template>
    <NavBar></NavBar>
    <h1 class="my-5 bold">¡Bienvenido/a {{user.toUpperCase()}}!</h1>
    <PricesTable v-if="mostrar === 3" :eth="this.eth"
    :usdc="this.usdc" :btc="this.btc"></PricesTable>
    <div v-else-if="mostrar < 3" class="my-5">
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
      mostrar: null,
      user: this.$store.state.Id,
    };
  },
  created() {
    this.obtenerPrecio();
  },
  methods: {
    obtenerPrecio() {
      cryptoyaApi.getBitcoin().then((response) => {
        this.btc = response.data;
        this.mostrar += 1;
      });
      cryptoyaApi.getEtherum().then((response) => {
        this.eth = response.data;
        this.mostrar += 1;
      });
      cryptoyaApi.getUSDC().then((response) => {
        this.usdc = response.data;
        this.mostrar += 1;
      });
    },
  },
};
</script>

<style scoped>
</style>
