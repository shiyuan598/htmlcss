import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    messages: '',
    data: null,
    info: 'what for dinner?',
    food: ''
  },
  getters: {
    foodStr: (state) => {
      let data = state.food
      return data && 'You want eat ' + data + ' for dinner.\n Got it !'
    }
  },
  mutations: {
    setMessages (state, value) {
      state.messages = value
    },
    setFood (state, value) {
      state.food = value
    }
  },
  actions: {
    getMessages () {
      let url = 'https://demo.navinfo.sg/5g_map_trackgetPositionsByIndex?index=3'
      fetch(url).then((data) => {
        this.state.messages = data.status
        return data.json()
      }).then(data => {
        this.state.data = data
      })
    }
  }
})
