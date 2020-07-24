<template>
  <div>
    <h3>Hi! {{name}}</h3>
    <input type="text" v-model="message" @keydown.enter="inputEnter">
    <button @click.self.prevent="send" :disabled="!message" class="btn-send">Send</button>
    <div class="container">
      <div class="tools">
          <label for="" class='time'>{{timeStr}}</label>
          <button @click="clear" v-show="this.sendText.length" class="btn-clear">Clear</button>
      </div>
      <div class="send" v-show="this.sendText.length">
        <ul>
          <li v-for="(data, index) in sendText" :key="index">{{data.name}}{{': '}}{{data.message}}</li>
        </ul>
      </div>
      <div class="recive" v-show="this.reciveText.length">
        <ul>
          <li v-for="(data, index) in reciveText" :key="index">{{data.name}}{{': '}}{{data.message}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../util/config'
export default {
  name: 'socket-message',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      time: '',
      message: '',
      sendText: [],
      reciveText: [],
      ws: null
    }
  },
  computed: {
    timeStr: {
      get () {
        let time = this.time || new Date().toLocaleTimeString()
        return time
      },
      set (value) {
        this.time = value
      }
    }
  },
  mounted () {
    this.createWS()
    this.updateTime()
  },
  methods: {
    inputEnter () {
      this.send()
    },
    send () {
      if (!this.message) {
        return
      }
      let value = {
        name: this.name,
        message: this.message
      }
      this.ws.send(JSON.stringify(value))
      this.sendText.push(value)
      this.message = ''
    },
    clear () {
      this.sendText = []
      this.reciveText = []
    },
    createWS () {
      let that = this
      let ws = new WebSocket(config.websocketUrl)
      ws.onopen = function (e) {
        console.info('connect success！')
      }
      ws.onmessage = function (e) {
        console.info('recive....')
        let data = JSON.parse(e.data)
        if (data.name !== that.name) {
          that.reciveText.push(data)
        }
      }
      that.ws = ws
    },
    updateTime () {
      // 实时更新时间
      let that = this
      setInterval(() => {
        that.time = new Date().toLocaleTimeString()
      }, 1000)
    }
  }
}
</script>

<style>
  h3{
    color: #666;
  }
  input{
    width: 300px;
  }
  button{
    margin-left: 10px;
    color: #333;
  }
  .time{
    font-size: 12px;
    color: #666;
  }
  .container{
    position: relative;
    width: 800px;
    min-width: 600px;
    min-height: 300px;
    margin: 0 auto;
  }
  .tools{
    height: 30px;
    margin: 10px;
    position: absolute;
    right: 60px;
  }
  .send, .recive{
    top: 30px;
    margin: 10px;
    width: 300px;
    border: 1px solid #aaa;
    border-radius: 3px;
    position: absolute;
    text-align: left;
  }
  .send{
    left: 50px
  }
  .recive{
    right: 50px;
  }
  ul, li{
    padding: 0;
    margin: 0px;
    list-style: none;
    color: #666;
    font-size: 14px;
  }
  li{
    margin: 3px;
    padding-left: 10px;
  }
</style>
