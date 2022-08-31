<template>
<div class="chartBox shadow p-3 mb-5 bg-body rounded">
  <canvas id="lineChart"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default ({
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
  mounted() {
    const usdcPriceThen = this.priceThen.usdc;
    const usdcPriceNow = (this.priceNow.usdc * this.counter.usdc);
    const ethPriceThen = this.priceThen.eth;
    const ethPriceNow = (this.priceNow.eth * this.counter.eth);
    const btcPriceThen = this.priceThen.btc;
    const btcPriceNow = (this.priceNow.btc * this.counter.btc);
    const ctx = document.getElementById('lineChart');
    const labels = ['Precio de compra', 'Precio actual'];
    const data = {
      labels,
      datasets: [{
        label: 'USDC',
        data: [usdcPriceThen, usdcPriceNow],
        fill: false,
        borderColor: '#2775ca',
        tension: 0.4,
        backgroundColor: '#2775ca',
        pointHoverBorderColor: 'white',
        pointHoverBackgroundColor: '#2775ca',
        pointHoverBorderWidth: 3,
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
      {
        label: 'Ethereum',
        data: [ethPriceThen, ethPriceNow],
        fill: false,
        borderColor: 'rgb(60, 60, 61)',
        tension: 0.4,
        backgroundColor: 'rgb(60, 60, 61)',
        pointHoverBorderColor: 'white',
        pointHoverBackgroundColor: 'rgb(60, 60, 61)',
        pointHoverBorderWidth: 3,
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
      {
        label: 'Bitcoin',
        data: [btcPriceThen, btcPriceNow],
        fill: false,
        borderColor: 'rgb(242, 169, 0)',
        tension: 0.4,
        backgroundColor: 'rgb(242, 169, 0)',
        pointHoverBorderColor: 'white',
        pointHoverBackgroundColor: 'rgb(242, 169, 0)',
        pointHoverBorderWidth: 3,
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 5,
      }],
    };
    const config = {
      type: 'line',
      data,
    };
    // Error de constante no utilizada
    // eslint-disable-next-line
    const myChart = new Chart(ctx, config);
  },
});
</script>

<style scoped>
.chartBox {
  margin-left: 1vw;
  margin-right: 5vw;
  width: 35%;
}
@media (max-width: 992px) {
  .chartBox {
    width: 85%;
    margin: 2vw 7.5%;

  }
}
</style>
