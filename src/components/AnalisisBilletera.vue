<template>
<div>
  <div class="chartBox shadow p-3 mb-5 bg-body rounded">
    <h2><span class="usdcColor">USDC</span> {{usdcCounter}}</h2><br>
    <h2><span class="ethColor">Ethereum</span> {{ethCounter}}</h2><br>
    <h2><span class="btcColor">Bitcoin</span> {{btcCounter}}</h2><br>
    <h2><span class="darkGreen">Total</span> AR${{total}}</h2>
  </div>
</div>
</template>

<script>
export default ({
  props: {
    usdcCounter: {
      type: Number,
      require: true,
    },
    ethCounter: {
      type: Number,
      require: true,
    },
    btcCounter: {
      type: Number,
      require: true,
    },
    price: {
      type: Object,
      require: true,
    },
  },
  computed: {
    total() {
      // eslint-disable-next-line
      return (this.price.btc * this.btcCounter + this.price.eth * this.ethCounter + this.price.usdc * this.usdcCounter).toFixed(2);
    },
  },
});
</script>

<style scoped>
.usdcColor {
  color: #2775ca;
}
.ethColor {
  color: rgb(60, 60, 61);
}
.btcColor {
  color:  rgb(242, 169, 0);
}
.chartBox {
  margin: 2vw 5vw;
}
@media (min-width: 992px) {
  .chartBox {
    margin: 2vw 2vw;
  }
}
.darkGreen {
  color: #85bb65;
}
</style>
