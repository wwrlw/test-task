<template>
  <div>
    <p>Счетчик: {{ counter }}</p>
    <button @click="increment">
      Увеличить
    </button>
  </div>
</template>

<script>
import {mapState } from "vuex";

export default {
  name: 'RequestList',
  computed: {
    ...mapState({
      counter: state => state.count
    })
  },
  methods: {
    increment(){
      this.$store.commit('increment')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>