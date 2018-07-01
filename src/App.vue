<template>
  <div class=app>
    <div class=heart-rate-wrapper>
      <HeartRate v-if=heartRate :value=heartRate />
      <i v-else class="fas fa-heartbeat"></i>
      <div>
        <button v-if=!heartRate @click=onClick class=blue>Click to start</button>
      </div>
      <div>
        <button v-if=!heartRate @click=onClickTest class=blue>Test dataset</button>
      </div>
    </div>
    <div class=heart-rate-chart-wrapper>
      <HeartRateChart :values=heartRateData />
    </div>
  </div>
</template>

<script>
import HeartRate from './components/HeartRate.vue';
import HeartRateChart from './components/HeartRateChart.vue';
import { parseHeartRateValues } from './utils';
import data from './__mock__/data';

export default {
  name: 'app',
  components: {
    HeartRate,
    HeartRateChart,
  },
  data: () => ({
    heartRate: 0,
    heartRateData: [[], [], [], [], [], []],
  }),
  methods: {
    onClick() {
      navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
      })
        .then(device => device.gatt.connect())
        .then(server => server.getPrimaryService('heart_rate'))
        .then(service => service.getCharacteristic('heart_rate_measurement'))
        .then(characteristic => characteristic.startNotifications())
        .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', this.handleCharacteristicValueChanged.bind(this)))
        .catch(error => console.log(error));
    },
    onClickTest() {
      this.heartRateData = [
        data(300, 60, 100),
        data(300, 104, 114),
        data(300, 133, 152),
        data(300, 152, 172),
        data(300, 172, 190),
      ];
      this.heartRate = 73;
    },
    pushData(index, value) {
      this.heartRateData[index].push({ x: Date.now(), y: value });
      this.heartRateData = [...this.heartRateData];
    },
    handleCharacteristicValueChanged(e) {
      const value = parseHeartRateValues(e.target.value).heartRate;
      this.heartRate = value;

      switch (value) {
        case value > 104 && value < 114:
          this.pushData(1, value);
          break;
        case value > 114 && value < 133:
          this.pushData(2, value);
          break;
        case value > 133 && value < 152:
          this.pushData(3, value);
          break;
        case value > 152 && value < 172:
          this.pushData(4, value);
          break;
        case value > 172:
          this.pushData(5, value);
          break;

        default: this.pushData(0, value);
      }
    },
  },
};
</script>

<style lang="scss">
  @import './styles/mixins';

  html, body {
    margin: 0px;
  }

  :root {
    // COLORS
    --first-part-background-color: #252e47;
    --second-part-background-color: #212942;
    --background-color: var(--first-part-background-color);
    --text-color: #fcfcfc;

    // TYPOGRAPHY
    --heart-font-size: 2.5em;
  }

  .app {
    display: grid;
    grid-gap: 1rem;
    height: 100vh;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "first" "second";
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .heart-rate-wrapper {
    padding-top: 5rem;
    background-color: var(--first-part-background-color);
    font-size: var(--heart-font-size);

    .fa-heartbeat {
      @include heart-rate-gradient;
      font-size: var(--heart-font-size);
    }

    button {
      transition: opacity ease;
      border: none;
      border-radius: .3em;
      padding: .6em 1.2em;
      color: var(--text-color);
      font-size: .3em;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      opacity: .9;

      &:hover {
        opacity: 1;
      }

      &.blue {
        background: linear-gradient(to right, #2d49f7, #4285f6);
      }
    }
  }

  .heart-rate-chart-wrapper {
    background-color: var(--second-part-background-color);
  }
</style>
