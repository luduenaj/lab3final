<template>
<div class="container">
  <table class="table table-bordered align-middle">
    <tbody v-for="(movimiento, index) in json" :key="movimiento._id">
      <tr>
        <th scope="row">{{fecha(movimiento.datetime)}}</th>
        <td>{{actionType(movimiento.action)}}</td>
        <td>{{movimiento.crypto_code.toUpperCase()}} {{movimiento.crypto_amount}}</td>
        <td>AR$ {{movimiento.money}}</td>
        <td>
          <button class="btn verdeClaro me-2 mb-1" data-bs-toggle="modal"
          data-bs-target="#modalLeer" @click="llenarLeer(index)">Leer</button>
          <button class="btn verdeOscuro me-2 mb-1" data-bs-toggle="modal"
          data-bs-target="#modalEditar" @click="llenarLeer(index)">Editar</button>
          <button class="btn btn-danger mb-1" data-bs-toggle="modal"
          data-bs-target="#modalEliminar" @click="id = movimiento._id">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="modalLeer" tabindex="-1"
      aria-labelledby="Leer" aria-hidden="true"  v-if="leer !== {}">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Leer🔎</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <h5>Fecha: {{leer.datetime}}</h5>
          <h5>Usuario: {{leer.user_id}}</h5>
          <h5>Movimiento: {{actionType(leer.action)}}</h5>
          <h5>Moneda: {{leer.crypto_code}}</h5>
          <h5>Monto: {{leer.crypto_amount}}</h5>
          <h5>Precio: AR${{leer.money}}</h5>
          <h5>Exchange: {{exchangeUsed(leer.crypto_code)}}</h5>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalEditar" tabindex="-1"
      aria-labelledby="Leer" aria-hidden="true"  v-if="leer !== {}">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" >Editar🌯</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <label for="crypto_code">Fecha<input v-model="datetimeEdit"
          type="datetime-local" name="crypto_code"
          class="form-control text-center mb-2" disabled></label>
          <br>
          <label for="crypto_code">Usuario
          <input v-model="leer.user_id" type="text" name="crypto_code" class="form-control
          text-center mb-2" disabled>
          </label>
          <br>
          <label for="action" class="mb-2">Movimiento<select class="form-select text-center"
          name="action"
          v-model="this.leer.action">
              <option value="sale">Venta 🤑</option>
              <option value="purchase">Compra 💲</option>
            </select>
          </label>
          <br>
          <label for="coin" class="mb-2">Moneda<select class="form-select text-center" name="coin"
          v-model="this.leer.crypto_code">
              <option>ETH</option>
              <option>USDC</option>
              <option>BTC</option>
            </select>
          </label>
          <br>
          <label for="crypto_amount">Monto
          <input v-model="leer.crypto_amount" type="number" name="crypto_amount" class="form-control
          text-center mb-2">
          </label>
          <br>
          <label for="money">Precio AR$
          <input v-model="leer.money" type="number" name="money" class="form-control
          text-center mb-2">
          </label>
          <br>
          <label for="coin">Exchange<select class="form-select text-center" name="coin"
          v-model="this.leer.crypto_code">
              <option value="ETH">Satoshi Tango</option>
              <option value="USDC">Lemon Cash</option>
              <option value="BTC">ARGENBTC</option>
            </select>
          </label>
          <p class="mb-2">(Vinculado a su moneda)</p>
        </div>
        <div class="modal-footer mx-5 ">
          <button type="button" class="btn btn-primary"
          data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal"
          data-bs-toggle="modal" data-bs-target="#modalEditarSiNo">Editar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalEliminar" tabindex="-1"
      aria-labelledby="Eliminar" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">⚠⚠⚠ Advertencia ⚠⚠⚠</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>¿Seguro que desea eliminar el movimiento?</h5>
        </div>
        <div class="modal-footer mx-5 ">
          <button type="button" class="btn btn-primary"
          data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
          @click="eliminar(this.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalEditarSiNo" tabindex="-1"
      aria-labelledby="Eliminar" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"
          id="exampleModalLabel">
            ¿Seguro que desea editar el movimiento?
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-1" v-if="leer.action !== copyLeer.action">
            <h5>Fecha</h5>
            <h5>
            {{actionType(copyLeer.action)}} ➡ {{actionType(leer.action)}}
            </h5>
          </div>
          <div class="mb-1" v-if="leer.crypto_amount !== copyLeer.crypto_amount">
            <h5>Monto</h5>
            <h5>
            {{copyLeer.crypto_amount}} ➡ {{leer.crypto_amount}}
            </h5>
          </div>
          <div class="mb-1" v-if="leer.crypto_code !== copyLeer.crypto_code">
            <h5>Moneda</h5>
            <h5>
            {{copyLeer.crypto_code}} ➡ {{leer.crypto_code}}
            </h5>
          </div>
          <div class="mb-1" v-if="leer.money !== copyLeer.money">
            <h5>Precio AR$</h5>
            <h5>
            {{copyLeer.money}} ➡ {{leer.money}}
            </h5>
          </div>
          <div class="mb-1" v-if="leer.crypto_code !== copyLeer.crypto_code">
            <h5>Exchange</h5>
            <h5>
            {{exchangeUsed(copyLeer.crypto_code)}} ➡ {{exchangeUsed(leer.crypto_code)}}
            </h5>
          </div>
        </div>
        <div class="modal-footer mx-5 ">
          <button type="button" class="btn btn-primary"
          data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal"
          @click="editarMovimiento">
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
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
      id: null,
      leer: {
        _id: null,
        crypto_code: null,
        crypto_amount: null,
        money: null,
        user_id: null,
        action: null,
        datetime: null,
      },
      exchange: null,
      datetimeEdit: null,
      copyLeer: {},
      editar: {},
    };
  },
  methods: {
    editarMovimiento() {
      if (this.copyLeer.crypto_amount !== this.leer.crypto_amount) {
        this.editar.crypto_amount = this.leer.crypto_amount.toString();
      }
      if (this.copyLeer.crypto_code !== this.leer.crypto_code) {
        this.editar.crypto_code = (this.leer.crypto_code).toLowerCase();
      }
      if (this.copyLeer.action !== this.leer.action) {
        this.editar.action = this.leer.action;
      }
      if (this.copyLeer.money !== this.leer.money) {
        this.editar.money = (this.leer.money).toFixed(2);
      }
      //  Desactive eslint por _id
      // eslint-disable-next-line
      lab3Api.patchMovimiento(this.leer._id, this.editar).then((response) => {
        console.log(response);
        this.$router.go();
      });
    },
    eliminar(id) {
      try {
        lab3Api.deleteMovimiento(id).then((response) => {
          console.log(response);
          this.alerta = true;
          this.$router.go();
        });
      } catch {
        this.alerta = false;
      }
    },
    llenarLeer(index) {
      //  Desactive eslint por _id
      // eslint-disable-next-line
      this.leer._id = this.json[index]._id;
      this.leer.crypto_code = this.json[index].crypto_code.toUpperCase();
      this.leer.crypto_amount = this.json[index].crypto_amount;
      this.leer.money = this.json[index].money;
      this.leer.user_id = this.json[index].user_id.toUpperCase();
      this.leer.action = (this.json[index].action);
      this.leer.datetime = this.fecha(this.json[index].datetime);
      this.exchange = this.exchangeUsed(this.json[index].crypto_code);
      this.datetimeEdit = this.fechaInput(this.json[index].datetime);
      // Solucion para que copyLeer no sea reactivo con leer
      // eslint-disable-next-line
      this.copyLeer = Object.assign({}, this.leer);
    },
  },
  computed: {
    fecha() {
      return (fecha) => {
        const date = new Date(fecha);
        const hour = `${date.toISOString().split('T')[1]}`;
        let datetime = `${date.toISOString().split('T')[0]}`;
        datetime = datetime.split('-').reverse().join('-');
        return `${datetime} ${hour.substring(0, 5)}`;
      };
    },
    fechaInput() {
      return (fecha) => {
        const date = new Date(fecha);
        const hour = `${date.toISOString().split('T')[1]}`;
        let datetime = `${date.toISOString().split('T')[0]}`;
        datetime = datetime.split('-').join('-');
        return `${datetime} ${hour.substring(0, 5)}`;
      };
    },
    fechaEditar() {
      return (fecha) => {
        let date = fecha.split(' ')[0];
        date = date.split('-').reverse().join('-');
        const hour = fecha.split(' ')[1];
        return `${date} ${hour}`;
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
    exchangeUsed() {
      return (cryptoCode) => {
        if (cryptoCode === 'USDC') {
          return 'Lemon Cash';
        }
        if (cryptoCode === 'BTC') {
          return 'ARGENBTC';
        }
        if (cryptoCode === 'ETH') {
          return 'Satoshi Tango';
        }
        return 'Error';
      };
    },
  },
});
</script>

<style scoped>
.verdeClaro, .verdeClaro:hover, .verdeClaro:active, .verdeClaro:focus {
  background-color: #add197;
}
.verdeOscuro, .verdeOscuro:hover, .verdeOscuro:active, .verdeOscuro:focus {
  background-color: #85bb65;
}
/*Esconder flechas input[type=number]*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
