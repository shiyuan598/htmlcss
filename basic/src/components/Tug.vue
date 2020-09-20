<template>
  <div>
    <Setting v-if="show"/>
    <SocketMessage :name="name" v-else></SocketMessage>
  </div>
</template>

<script>
import eventBus from '../util/eventBus'
import Setting from './Setting'
import SocketMessage from './SocketMessage'

export default {
  name: 'tug',
  components: {
    Setting,
    SocketMessage
  },
  data () {
    return {
      name: '',
      show: true
    }
  },
  mounted () {
    let that = this
    eventBus.$on('SettingName', (name) => {
      that.name = name
      that.show = false
    })
  }
}
</script>

<style>
</style>
