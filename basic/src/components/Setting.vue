<template>
  <div>
    <h3>Set Your Name Here:</h3>
    <input type="text" v-model="name" @keyup="keyup($event)" @keydown.enter="keyEnter">
    <button :disabled="!name" @click="btnOk">ok</button>
  </div>
</template>

<script>
import eventBus from '../util/eventBus'
export default {
  name: 'setting',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    keyEnter () {
      this.btnOk()
    },
    keyup (event) {
      let value = event.target.value
      let reg = /[^A-Za-z0-9\u4e00-\u9fa5]/g
      this.name = value.replace(reg, '')
    },
    btnOk () {
      eventBus.$emit('SettingName', this.name)
    }
  }
}
</script>

<style>

</style>
