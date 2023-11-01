<template>
    <div class="text-center">

        <v-btn
            :disabled="dialog"
            :loading="dialog"
            color="purple-darken-2"
            @click="dialog = true"
        >
            Start loading
        </v-btn>

        <v-dialog
            v-model="dialog"
            :scrim="false"
            persistent
            width="auto"
        >
            <v-card
                color="primary"
            >
                <v-card-text>
                    Please stand by
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>

export default {
    data()
    {
        return {
            dialog: false,
        }
    },

    watch: {
        dialog(val)
        {
            if (!val) return

            setTimeout(() => (this.dialog = false), 4000)
        },
    },

    created()
    {
        console.log("Try Send")
        ipcRendererApi.send('send_test_message', 'Hello from renderer process!')
    },

    mounted()
    {
        ipcRendererApi.on('reply_test_message', function (args){
            this.dialog = false

            console.log("Reply: ", args)
        })
    }
}

</script>