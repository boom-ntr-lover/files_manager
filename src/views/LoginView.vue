<template>
    <div class="text-center">

        <v-dialog
            v-model="waiting"
            :scrim="false"
            persistent
            width="auto"
        >
            <v-card
                color="primary"
            >
                <v-card-text>
                    Loading Data
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
            waiting: true,
        }
    },

    watch: {},

    created()
    {
        if (ipcRendererApi.send('send_test_message', 'Hello from renderer process!'))
        {
            console.log("Send Msg")
            this.waiting = true
        }
    },

    mounted()
    {
        ipcRendererApi.on('reply_test_message', function (event, args)
        {
            console.log("Reply: ", args)

            setTimeout(() => (this.waiting = false), 5000)
        }.bind(this))
    }
}

</script>