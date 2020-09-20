<template>
  <div>
    <h3>Vue Vuex</h3>
    <!-- <span>{{info}}</span>
    <input type="text" v-model="food" @keyup="onKeyup">
    <p class="food">{{foodStr}}</p>
    <p>{{$store.getters.foodStr}}</p> -->
    <h6>status:{{status}}</h6>
    <p>{{positions}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Demo',
  data () {
    return {
      fruits: ['芒果', '香蕉', '荔枝'],
      goods: {
        milk: 2,
        vegetable: 3,
        chips: 2
      },
      inputNum: 10,
      food: ''
    }
  },

  computed: mapState({
    positions: (state) => {
      let data = state.data
      return data && (data.positions)
    },
    status: 'messages',
    info: 'info',
    foodStr: (state) => {
      let data = state.food
      return data && 'You want eat ' + data + ' for dinner.\n Got it !'
    }
  }),
  // computed: {
  //   positions () {
  //     let data = this.$store.state.data
  //     return data && (data.positions)
  //   }
  // },
  filters: {
    addUnit (value) {
      return value + ' bags.'
    }
  },
  mounted () {
    this.$store.commit('setMessages', 'hello world')
    this.$store.dispatch('getMessages')
  },
  methods: {
    onKeyup ($event) {
      let value = $event.target.value
      this.$store.commit('setFood', value)
    }
  }
}
</script>

<style>

</style>
<style lang='scss' scoped>
  $h3-color: #ffceeb;
  h3{
    color: $h3-color;
  }
  p{
    color: #87e0eb;
  }

  $text-color: #4f4f4f;
  h5{
    color: $text-color;
  }

  ul, li{
    list-style: none;
    color: $text-color;
  }
  span{
    color: #A2CD5A;
    font-size: 16px;
  }
  .food{
    color: #FFA07A;
  }
</style>
