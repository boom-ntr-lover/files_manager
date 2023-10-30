<template>
    <TestToMain></TestToMain>
</template>

<script>
import TestToMain from './components/TestToMain.vue'

export default {
    name: 'App',
    components:
        {
            // HelloWorld
            TestToMain,
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
