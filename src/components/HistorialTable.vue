<template>
<div class="container">
  <table class="table table-bordered align-middle">
    <tbody v-for="movimiento in json" :key="movimiento._id">
      <tr>
        <th scope="row">{{fecha(movimiento.datetime)}}</th>
        <td>{{actionType(movimiento.action)}}</td>
        <td>{{movimiento.crypto_code.toUpperCase()}} {{movimiento.crypto_amount}}</td>
        <td>AR$ {{movimiento.money}}</td>
        <td>
          <button class="btn btn-secondary me-2 mb-1">Leer</button>
          <button class="btn btn-primary me-2 mb-1">Editar</button>
          <button class="btn btn-danger mb-1" @click="eliminar(movimiento._id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import lab3Api from '@/services/lab3Api';

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
      alerta: null,
    };
  },
  methods: {
    eliminar(id) {
      try {
        lab3Api.deleteMovimiento(id).then((response) => {
          console.log(response);
          this.alerta = true;
        });
      } catch {
        this.alerta = false;
      }
    },
  },
  computed: {
    fecha() {
      return (fecha) => {
        const date = new Date(fecha);
        const hora = `${date.toISOString().split('T')[1]}`;
        let datetime = `${date.toISOString().split('T')[0]}`;
        datetime = datetime.split('-').reverse().join('-');
        return `${datetime} ${hora.substring(0, 5)}`;
      };
    },
    actionType() {
      return (action) => {
        if (action === 'purchase') {
          return 'Compra 💲';
        }
        if (action === 'sale') {
          return 'Venta 🤑';
        }
        return '';
      };
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
