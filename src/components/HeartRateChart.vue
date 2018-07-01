<script>
import { Scatter } from 'vue-chartjs';

export default {
  extends: Scatter,
  name: 'HeartRateChart',
  props: {
    values: {
      type: Array,
      default: () => [[], [], [], [], [], []],
    },
  },
  watch: {
    values() {
      this.updateChart();
    },
  },
  mounted() {
    this.updateChart();
  },

  methods: {
    updateChart() {
      this.renderChart({
        datasets: [
          {
            label: 'Chilling',
            data: this.values[0],
            backgroundColor: '#4f775c',
            borderColor: '#4f775c',
            showLine: true,
            fill: false,
          },
          {
            label: 'Very light',
            data: this.values[1],
            backgroundColor: '#465f9b',
            borderColor: '#465f9b',
            showLine: true,
            fill: false,
          },
          {
            label: 'Light',
            data: this.values[2],
            backgroundColor: '#4e4491',
            borderColor: '#4e4491',
            showLine: true,
            fill: false,
          },
          {
            label: 'Moderate',
            data: this.values[3],
            backgroundColor: '#6f2499',
            borderColor: '#6f2499',
            showLine: true,
            fill: false,
          },
          {
            label: 'Hard',
            data: this.values[4],
            backgroundColor: '#823e62',
            borderColor: '#823e62',
            showLine: true,
            fill: false,
          },
          {
            label: 'Maximum',
            data: this.values[5],
            backgroundColor: '#8a426f',
            borderColor: '#8a426f',
            showLine: true,
            fill: false,
          },
        ],
      }, {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales:
          {
            xAxes: [{
              display: false,
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: '#394365',
              },
              gridLines: {
                color: '#2a334e',
              },
            }],
          },
      });
    },
  },
};
</script>
