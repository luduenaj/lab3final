<template>
  <div>
    <NavBar></NavBar>
    <h2 class="mb-4">Historial 📁</h2>
    <CargandoPantalla v-if="!respuesta"></CargandoPantalla>
    <HistorialTable :json="json" v-if="json.length >= 1"></HistorialTable>
    <div class="" v-if="json.length === 0">
      <h1 class="mt-1">❌ERROR❌</h1>
      <h2>No existe historial🧐</h2>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import HistorialTable from '@/components/HistorialTable.vue';
import CargandoPantalla from '@/components/CargandoPantalla.vue';
import lab3Api from '@/services/lab3Api';

export default {
  data() {
    return {
      respuesta: null,
      json: {
      },
    };
  },
  created() {
    try {
      lab3Api.getHistorial(this.$store.state.Id).then((response) => {
        this.json = response.data;
        this.respuesta = true;
      });
    } catch (e) {
      console.log(e);
    }
  },
  components: {
    NavBar,
    HistorialTable,
    CargandoPantalla,
  },
};
</script>

<style scoped>

</style>
