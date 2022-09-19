<template>
  <div>
    <div class="chartBox shadow p-3 mb-5 bg-body rounded">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default ({
  data() {
    return {
    };
  },
  props: {
    price: {
      type: Object,
      require: true,
    },
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
  },
  mounted() {
    const usdc = parseFloat((this.usdcCounter * this.price.usdc).toFixed(2));
    const eth = parseFloat((this.ethCounter * this.price.eth).toFixed(2));
    const btc = parseFloat((this.btcCounter * this.price.btc).toFixed(2));
    const ctx = document.getElementById('myChart');
    const data = {
      labels: [
        'Bitcoin',
        'USDC',
        'Ethereum',
      ],
      datasets: [{
        label: 'Monedero',
        data: [btc, usdc, eth],
        backgroundColor: [
          'rgb(242, 169, 0)',
          '#2775ca',
          'rgb(60, 60, 61)',
        ],
        hoverOffset: 4,
      }],
    };
    const options = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      responsive: true,
      cutoutPercentage: 50,
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Precio en AR$',
          padding: {
            top: 10,
          },
        },
      },
    };
    // Error de constante no utilizada
    // eslint-disable-next-line
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });
  },
});
</script>

<style scoped>
.chartBox {
  margin: 2vw 5vw;
}
@media (min-width: 992px) {
  .chartBox {
    margin: 2vw 2vw;
  }
}
</style>
