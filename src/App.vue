<template>
  <div id="app">
    <turn-table :prize-list="prizeList"></turn-table>
  </div>
</template>

<script>
import turnTable from './components/turnTable.jsx'
import { prizeList } from './components/config'
export default {
  name: 'App',
  data() {
    return {
      prizeList
    }
  },
  components: {
    turnTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
