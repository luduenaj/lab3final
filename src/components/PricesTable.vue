<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-4">
        <img src="../assets/btc.png" class="rounded" alt="Logo de bitcoin">
        <div class="row  mt-3">
          <div class="col-12 col-xl-12"><h2 class="my-2">Bitcoin</h2></div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Comprar</h3>
            <h4>${{btc.totalAsk}}</h4>
          </div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Vender</h3>
            <h4>${{btc.totalBid}}</h4>
          </div>
          <h5>Cotización: <a href="https://argenbtc.com/">ARGENBTC</a></h5>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <img src="../assets/logo-ethereum.png" class="rounded" alt="Logo de Ethereum">
        <div class="row  mt-3">
          <div class="col-12 col-xl-12"><h2 class="my-2">Ethereum</h2></div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Comprar</h3>
            <h4>${{eth.totalAsk}}</h4>
          </div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Vender</h3>
            <h4>${{eth.totalBid}}</h4>
          </div>
          <h5>Cotización: <a href="https://www.satoshitango.com/">Satoshi Tango</a></h5>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <img src="../assets/usdc-logo.png" class="rounded" alt="Logo de Usdc">
        <div class="row  mt-3">
          <div class="col-12 col-xl-12"><h2 class="my-2">USDC</h2></div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Comprar</h3>
            <h4>${{usdc.totalAsk}}</h4>
          </div>
          <div class="col-12 col-xl-6 my-3 shadow-sm p-1 mb-5 bg-body rounded">
            <h3>Vender</h3>
            <h4>${{usdc.totalBid}}</h4>
          </div>
          <h5>Cotización: <a href="https://www.lemon.me/">Lemon Cash</a></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'PricesTable',
  props: {
    btc: {
      type: Object,
      required: true,
    },
    usdc: {
      type: Object,
      required: true,
    },
    eth: {
      type: Object,
      required: true,
    },
  },
  setup() {
  },
});
</script>

<style scoped>
img{
  height: 20vw;
}
h5{
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: solid lightgrey;
}

</style>
