<template>
  <div>
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
  name: 'HeartRate',
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/mixins';

  div {
    @include heart-rate-gradient;
    font-size: var(--heart-font-size);
  }
</style>
