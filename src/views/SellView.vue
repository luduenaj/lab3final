<template>
  <div>
    <NavBar></NavBar>
    <h2 class="my-3">Vender 🤑</h2>
    <div class="container">
      <form @submit.prevent="">
        <select class="form-select text-center mb-3" v-model="coin"
        aria-label="Default select example" required>
          <option selected>Elije una moneda</option>
          <option value="usdc">USDC</option>
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
        </select>
        <h6 class="text-center">Ingrese el monto que desea vender</h6>
        <div class="input-group mb-1">
          <span class="input-group-text"
          v-if="coin !== 'Elije una moneda'">{{coin.toUpperCase()}}</span>
          <span class="input-group-text" v-else>$</span>
          <input type="number" step="0.0000000001" class="form-control" v-model="amount"
          aria-label="Amount (to the nearest dollar)"
          placeholder="Ej: 0.00001">
        </div>
        <h6 class="text-center mb-3">Disponible {{disponibilidad}}</h6>
        <button type="button" class="btn btn-light border" data-bs-toggle="modal"
          data-bs-target="#modalCompra" :disabled="isDisabled">
          Buscar cotización
        </button>
      </form>
      <div class="modal fade" id="modalCompra" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              @click="vender">Vender</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="ventaRealizada !== null">
      <div class="alert alert-success alertCompra mt-5 alert-dismissible fade show"
      role="alert" v-show="ventaRealizada">
        💸¡Venta exitosa!💸
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
        @click="this.$router.go()"></button>
      </div>
      <div class="alert alert-danger alertCompra mt-5 alert-dismissible fade show"
      role="alert" v-show="!ventaRealizada">
        ❌ERROR❌
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
        @click="this.$router.go()"></button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import cryptoyaApi from '@/services/cryptoyaApi';

export default {
  data() {
    return {
      coin: 'Elije una moneda',
      amount: null,
      terms: false,
      ventaRealizada: null,
      datetime: '',
      money: null,
      cotizacion: { btc: null, eth: null, usdc: null },
      totalAsk: null,
      venta: {
        user_id: null, action: 'sale', crypto_code: null, crypto_amount: null, money: null, datetime: null,
      },
      disponible: { btc: 2, etc: 1, usdc: 3 },
    };
  },
  methods: {
    vender() {
      const date = new Date();
      const fecha = `${(`00${date.getDate()}`).slice(-2)}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${date.getFullYear()} ${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`;
      this.datetime = fecha;
      this.amount = parseFloat(this.amount);
      this.money = this.cotizacionUsada;
      this.objetoVenta();
      console.log(this.venta);
      this.ventaRealizada = true;
    },
    objetoVenta() {
      this.venta.user_id = this.$store.state.Id;
      this.venta.crypto_code = this.coin;
      this.venta.crypto_amount = this.amount.toString();
      this.venta.money = this.money;
      this.venta.datetime = this.datetime;
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
  },
  computed: {
    isDisabled() {
      if (this.coin === 'Elije una moneda') {
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
      if (this.amount === null) {
        return !this.terms;
      }
      if (parseFloat(this.amount) === 0) {
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
    disponibilidad() {
      if (this.coin === 'Elije una moneda') {
        return '';
      }
      if (this.coin === 'usdc') {
        return this.disponible.usdc;
      }
      if (this.coin === 'btc') {
        return this.disponible.btc;
      }
      return this.disponible.btc;
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
  created() {
    this.obtenerPrecio();
  },
  components: {
    NavBar,
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
