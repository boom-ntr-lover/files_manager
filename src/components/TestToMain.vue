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
import { ref, onMounted, Vue } from 'vue'
import { ipcRenderer } from 'electron'

const loading = ref(false)
const count = ref(0)

onMounted(
    () => {
        setupIpcRenderer()
    }
)

function setupIpcRenderer()
{
    ipcRenderer.on('test_reply_message', function (args){
        // console.log("Reply: ", args)

        loading.value = false
        count.value++
    }.bind(loading))
}

function load() {
    this.loading = true
    ipcRenderer.send('test_send_message', 'Hello from renderer process!')
}

</script>
