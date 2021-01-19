<template>
  <div>
    <button @click="increment">增加</button>
        <button @click="decrement">减少</button>
        <button @click="decrementAsync">延时减少</button>
        <button @click="incrementAsync">延时增加</button>
    <h3>{{ count }}</h3>
    <h3>{{isEvenorOdd}}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";
export default {
  data() {
    return {
      mycount: 45,
    };
  },
  computed: {
      ...mapGetters(['count','isEvenorOdd'] )
  },
  methods: {
      ...mapActions(['increment','decrement','incrementAsync','decrementAsync']),
  }
};
</script>

<style></style>
