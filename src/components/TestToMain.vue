
<template>
    <v-btn
        :loading="loading"
        class="flex-grow-1"
        height="48"
        variant="tonal"
        @click="load()"
    >
        Count is: {{ count }}
    </v-btn>
</template>

<style scoped>

</style>

<script setup>
import { ref, onMounted } from 'vue'
import { ipcRenderer } from 'electron'

const loading = ref(false)
const count = ref(0)

// 生命周期钩子
onMounted(() => {
    ipcRenderer.on('reply', (event, arg) => {
        console.log('get reply', arg)
    })
})

function load() {
    this.loading = true
    console.log("Send")
    ipcRenderer.send('message', 'Hello from renderer process!')
}

</script>
