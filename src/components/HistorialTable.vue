<template>
<div class="container ">
  <table class="table table-bordered">
    <tbody v-for="movimiento in json" :key="movimiento._id">
      <tr>
        <!--Agregar computed para action para comprar y vender-->
        <th scope="row">{{movimiento.datetime}}</th>
        <td>{{}}</td>
        <td>{{movimiento.crypto_code.toUpperCase()}} {{movimiento.crypto_amount}}</td>
        <td><button class="btn btn-secondary me-2 mb-1">Leer</button><button class="btn btn-primary
        me-2 mb-1">Editar</button><button class="btn btn-danger mb-1">Eliminar</button></td>
      </tr>
    </tbody>
  </table>
  <CargandoPantalla v-if="json.length < 0"></CargandoPantalla>
</div>
</template>

<script>
import CargandoPantalla from '@/components/CargandoPantalla.vue';

export default ({
  name: 'HistorialTable',
  props: {
    json: {
      type: Object,
      require: true,
      action: '',
    },
  },
  data() {
    return {
    };
  },
  components: {
    CargandoPantalla,
  },
  computed: {
    actionType() {
      /*  if (movimiento.action === 'purchase') {
        return 'Compra';
      } */
      return '';
    },
  },
});
</script>

<style scoped>
/*.tabla{
  width: 60%;
  margin: 0 20%;
}*/
</style>
