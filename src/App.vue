<template>
    <h1>Hello World!</h1>
    <TestToMain></TestToMain>
</template>

<script>
import TestToMain from './components/TestToMain.vue'

export default {
    name: 'App',
    components:
        {
            TestToMain,
        }
}
</script>
