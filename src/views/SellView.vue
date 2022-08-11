<template>
  <div>
    <NavBar></NavBar>
    <h2 class="my-3">Vender 🤑</h2>
    <div class="container">
      <CargandoPantalla v-if="respuesta === null"></CargandoPantalla>
      <form v-else-if="respuesta === true" @submit.prevent="">
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
        <h6 class="text-center disponible" @click="maxDisponible"
        @keydown="maxDisponible">{{disponibilidad}}</h6>
        <button type="button" class="btn btn-light border mt-3" data-bs-toggle="modal"
          data-bs-target="#modalCompra" :disabled="isDisabled">
          Buscar cotización
        </button>
      </form>
      <div v-else-if="respuesta === false">
        <h2 class="mt-3">❌ERROR❌</h2>
        <h2>Servidor no responde</h2>
      </div>
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
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-danger alertCompra mt-5 alert-dismissible fade show"
      role="alert" v-show="!ventaRealizada">
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
import CargandoPantalla from '@/components/CargandoPantalla.vue';

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
      disponible: { btc: 0, eth: 0, usdc: 0 },
      respuesta: null,
      json: {},
    };
  },
  methods: {
    vender() {
      const date = new Date();
      const fecha = `${date.getFullYear()}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${(`00${date.getDate()}`).slice(-2)}T${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`;
      this.datetime = fecha;
      this.amount = parseFloat(this.amount);
      this.money = this.cotizacionUsada;
      this.objetoVenta();
      try {
        lab3Api.postCompraVenta(this.venta);
        this.ventaRealizada = true;
      } catch (e) {
        console.log(e);
        this.ventaRealizada = false;
      } finally {
        this.obtenerDisponibilidades();
      }
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
        this.cotizacion.btc = response.data.totalBid;
      });
      cryptoyaApi.getEtherum().then((response) => {
        this.cotizacion.eth = response.data.totalBid;
      });
      cryptoyaApi.getUSDC().then((response) => {
        this.cotizacion.usdc = response.data.totalBid;
      });
    },
    limpiarDisponible() {
      this.disponible.usdc = 0;
      this.disponible.eth = 0;
      this.disponible.btc = 0;
    },
    obtenerDisponibilidades() {
      this.limpiarDisponible();
      try {
        lab3Api.getHistorial(this.$store.state.Id).then((response) => {
          this.json = response.data;
          this.json.forEach((element) => {
            if (element.action === 'purchase') {
              if (element.crypto_code === 'usdc') {
                this.disponible.usdc += parseFloat(element.crypto_amount);
              }
              if (element.crypto_code === 'eth') {
                this.disponible.eth += parseFloat(element.crypto_amount);
              }
              if (element.crypto_code === 'btc') {
                this.disponible.btc += parseFloat(element.crypto_amount);
              }
            }
            if (element.action === 'sale') {
              if (element.crypto_code === 'usdc') {
                this.disponible.usdc -= parseFloat(element.crypto_amount);
              }
              if (element.crypto_code === 'eth') {
                this.disponible.eth -= parseFloat(element.crypto_amount);
              }
              if (element.crypto_code === 'btc') {
                this.disponible.btc -= parseFloat(element.crypto_amount);
              }
            }
          });
          if (this.disponible.usdc < 0) {
            this.disponible.usdc = 0;
          }
          if (this.disponible.eth < 0) {
            this.disponible.eth = 0;
          }
          if (this.disponible.btc < 0) {
            this.disponible.btc = 0;
          }
          this.respuesta = true;
        });
      } catch {
        this.respuesta = false;
      }
    },
    maxDisponible() {
      if (this.coin === 'usdc') {
        this.amount = this.disponible.usdc;
      }
      if (this.coin === 'eth') {
        this.amount = this.disponible.eth;
      }
      if (this.coin === 'btc') {
        this.amount = this.disponible.btc;
      }
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
      if (this.coin === 'usdc' && parseFloat(this.amount) > this.disponible.usdc) {
        return !this.terms;
      }
      if (this.coin === 'eth' && parseFloat(this.amount) > this.disponible.eth) {
        return !this.terms;
      }
      if (this.coin === 'btc' && parseFloat(this.amount) > this.disponible.btc) {
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
        if (this.disponible.usdc === 0) {
          return 'No disponible para vender😢';
        }
        return `Disponible: USDC ${this.disponible.usdc}`;
      }
      if (this.coin === 'btc') {
        if (this.disponible.btc === 0) {
          return 'No disponible para vender😢';
        }
        return `Disponible: BTC ${this.disponible.btc}`;
      }
      if (this.coin === 'eth') {
        if (this.disponible.eth === 0) {
          return 'No disponible para vender😢';
        }
        return `Disponible: ETH ${this.disponible.eth}`;
      }
      return '❌ERROR❌';
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
    this.obtenerDisponibilidades();
  },
  beforeMounted() {
  },
  components: {
    NavBar,
    CargandoPantalla,
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
.disponible:hover {
  color: #85bb65;
}
</style>
