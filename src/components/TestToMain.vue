<template>
<!--    <v-btn-->
<!--        :loading="loading"-->
<!--        class="flex-grow-1"-->
<!--        height="48"-->
<!--        variant="tonal"-->
<!--        @click="load()"-->
<!--    >-->
<!--        TestBtn {{ count }}-->
<!--    </v-btn>-->
    <div class="d-flex justify-center">
        <v-btn>
            block
            <v-overlay
                activator="parent"
                location-strategy="connected"
                scroll-strategy="block"
            >
                <v-card class="pa-2">
                    Hello!
                </v-card>
            </v-overlay>
        </v-btn>
    </div>
</template>

<style scoped>

</style>

<script setup>
import { ref, onMounted } from 'vue'
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
    ipcRenderer.on('reply_test_message', function (args){
        loading.value = false
        count.value++
    })
}

function load() {
    this.loading = true
    ipcRenderer.send('send_test_message', 'Hello from renderer process!')
}

</script>
