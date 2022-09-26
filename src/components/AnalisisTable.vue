<template>
  <div class="linetBox shadow p-3 mb-5 bg-body rounded">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Cryptomoneda</th>
          <th scope="col">Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-if="usdc > 0">
          <td><span class="usdcColor">USDC</span></td>
          <td :class="{ loss: !usdcResultClass, gain: usdcResultClass }">
            ${{usdc.toFixed(2)}}
          </td>
        </tr>
        <tr v-if="eth > 0">
          <td><span class="ethColor">Ethereum</span></td>
          <td :class="{ loss: !ethResultClass, gain: ethResultClass }">
            ${{eth.toFixed(2)}}
          </td>
        </tr>
        <tr  v-if="btc > 0">
          <td><span class="btcColor">Bitcoin</span></td>
          <td :class="{ loss: !btcResultClass, gain: btcResultClass }">
            ${{btc.toFixed(2)}}
          </td>
        </tr>
        <tr>
          <td><span class="gain">Ganancia</span></td>
          <td :class="{ loss: !gainResultClass, gain: gainResultClass }">
            ${{gain.toFixed(2)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Object,
      require: true,
    },
    priceThen: {
      type: Object,
      require: true,
    },
    priceNow: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      usdc: null,
      eth: null,
      btc: null,
      gain: null,
      usdcResultClass: null,
      ethResultClass: null,
      btcResultClass: null,
      gainResultClass: null,
    };
  },
  created() {
    this.calcularResultado();
    this.resultadoClass();
  },
  methods: {
    calcularResultado() {
      this.usdc = (this.priceNow.usdc * this.counter.usdc) - this.priceThen.usdc;
      this.eth = (this.priceNow.eth * this.counter.eth) - this.priceThen.eth;
      this.btc = (this.priceNow.btc * this.counter.btc) - this.priceThen.btc;
      this.gain = this.usdc + this.eth + this.btc;
    },
    resultadoClass() {
      if (this.usdc < 0) {
        this.usdcResultClass = false;
      }
      if (this.usdc >= 0) {
        this.usdcResultClass = true;
      }
      if (this.eth < 0) {
        this.ethResultClass = false;
      }
      if (this.eth >= 0) {
        this.ethResultClass = true;
      }
      if (this.btc < 0) {
        this.btcResultClass = false;
      }
      if (this.btc >= 0) {
        this.btcResultClass = true;
      }
      if (this.gain < 0) {
        this.gainResultClass = false;
      }
      if (this.gain >= 0) {
        this.gainResultClass = true;
      }
    },
  },
};
</script>

<style scoped>
.lineBox {
  margin-left: 1vw;
  margin-right: 5vw;
}
.usdcColor {
  color: #2775ca;
}
.ethColor {
  color: rgb(60, 60, 61);
}
.btcColor {
  color:  rgb(242, 169, 0);
}
.gain {
  color: #85bb65;
}
.loss {
  color: red;
}
@media (max-width: 993px){
  table {
    width: 75%;
    margin: 1vw 12.5%;
  }
}
@media (max-width: 577px){
  .linetBox {
    width: 85%;
    margin: 0 7.5%;
  }
}
</style>
