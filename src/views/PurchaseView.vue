<template>
  <div>
    <NavBar></NavBar>
    <h2 class="my-3">Comprar 💲</h2>
    <div class="container">
      <form @submit.prevent="">
        <select class="form-select text-center mb-3" v-model="coin"
        aria-label="Default select example" required>
          <option selected>Elije una moneda</option>
          <option value="usdc">USDC</option>
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
        </select>
        <h6 class="text-center">Ingrese el monto que desea comprar</h6>
        <div class="input-group mb-3">
          <span class="input-group-text"
          v-if="coin !== 'Elije una moneda'">{{coin.toUpperCase()}}</span>
          <span class="input-group-text" v-else>$</span>
          <input type="number" step="0.0000000001" class="form-control" v-model="amount"
          aria-label="Amount (to the nearest dollar)"
          placeholder="Ej: 0.00001">
        </div>
        <button type="button" class="btn btn-light border" data-bs-toggle="modal"
          data-bs-target="#modalCompra" :disabled="isDisabled">
          Buscar cotización
        </button>
      </form>
      <div class="modal fade" id="modalCompra" tabindex="-1"
      aria-labelledby="Comprar" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Cotización</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5>{{coin.toUpperCase()}} {{parseFloat(amount)}}</h5>
              <h4>Precio final AR${{cotizacionUsada}}</h4>
              <h5 class="exchange">exchange: {{exchangeUsed}}</h5>
            </div>
            <div class="modal-footer mx-5 ">
              <button type="button" class="btn btn-danger"
              data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-success" data-bs-dismiss="modal"
              @click="comprar">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="compraRealizada !==  null">
      <div class="alert alert-success alertCompra mt-5 alert-dismissible fade show"
      role="alert" v-show="compraRealizada">
        💸¡Compra exitosa!💸
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-danger alertCompra mt-5 alert-dismissible fade show"
      role="alert" v-show="!compraRealizada">
        ❌ERROR❌
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import cryptoyaApi from '@/services/cryptoyaApi';
import lab3Api from '@/services/lab3Api';

export default {
  data() {
    return {
      coin: 'Elije una moneda',
      amount: null,
      terms: false,
      compraRealizada: null,
      datetime: '',
      cotizacion: { btc: null, eth: null, usdc: null },
      money: null,
      compra: {
        user_id: null, action: 'purchase', crypto_code: null, crypto_amount: null, money: null, datetime: null,
      },
    };
  },
  setup() {
  },
  components: {
    NavBar,
  },
  created() {
    this.obtenerPrecio();
  },
  methods: {
    comprar() {
      this.amount = parseFloat(this.amount);
      this.money = this.cotizacionUsada;
      this.objetoCompra();
      console.log(this.compra);
      console.log(this.compra.datetime);
      try {
        lab3Api.postCompraVenta(this.compra).then((response) => {
          console.log(response.data);
          this.compraRealizada = true;
        });
      } catch {
        this.compraRealizada = false;
      }
    },
    obtenerPrecio() {
      cryptoyaApi.getBitcoin().then((response) => {
        this.cotizacion.btc = response.data.totalAsk;
      });
      cryptoyaApi.getEtherum().then((response) => {
        this.cotizacion.eth = response.data.totalAsk;
      });
      cryptoyaApi.getUSDC().then((response) => {
        this.cotizacion.usdc = response.data.totalAsk;
      });
    },
    objetoCompra() {
      const date = new Date();
      const fecha = `${date.getFullYear()}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${(`00${date.getDate()}`).slice(-2)}T${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`;
      this.datetime = (fecha).toString();
      this.compra.user_id = this.$store.state.Id;
      this.compra.crypto_code = this.coin;
      this.compra.crypto_amount = this.amount.toString();
      this.compra.money = this.money;
      this.compra.datetime = this.datetime;
    },
  },
  computed: {
    isDisabled() {
      if (this.coin === 'Elije una moneda') {
        return !this.terms;
      }
      if (this.amount === null) {
        return !this.terms;
      }
      if (parseFloat(this.amount) === 0) {
        return !this.terms;
      }
      if (this.cotizacion.btc === null) {
        return !this.terms;
      }
      if (this.cotizacion.eth === null) {
        return !this.terms;
      }
      if (this.cotizacion.usdc === null) {
        return !this.terms;
      }
      if ((Number.isNaN(parseFloat(this.amount))) === true) {
        return !this.terms;
      }
      return this.terms;
    },
    exchangeUsed() {
      if (this.coin === 'usdc') {
        return 'Lemon Cash';
      }
      if (this.coin === 'btc') {
        return 'ARGENBTC';
      }
      return 'Satoshi Tango';
    },
    cotizacionUsada() {
      if (this.coin === 'usdc') {
        return (this.cotizacion.usdc * this.amount).toFixed(2);
      }
      if (this.coin === 'eth') {
        return (this.cotizacion.eth * this.amount).toFixed(2);
      }
      if (this.coin === 'btc') {
        return (this.cotizacion.btc * this.amount).toFixed(2);
      }
      return 'ERROR';
    },
  },
};
</script>

<style scoped>
.container{
  width: 50%;
  margin: 0 25%;
}
.exchange{
  color: rgb(189, 189, 189);
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
