<template>
  <div>
    <NavBar></NavBar>
    <h2 class="mb-4">Historial 📁</h2>
    <HistorialTable :json="json" v-if="json.length > 0"></HistorialTable>
    <CargandoPantalla v-else></CargandoPantalla>
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
      json: {
      },
    };
  },
  created() {
    lab3Api.getHistorial(this.$store.state.Id).then((response) => {
      this.json = response.data;
    });
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
