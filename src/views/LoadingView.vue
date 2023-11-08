<template>
    <div class="text-center">

        <v-dialog
            v-model="bWaiting"
            hide-overlay
            persistent

            width="400"
        >
            <v-card
                elevation="4"
                dark
            >
                <v-card-text>
                    <v-toolbar-title>{{ value }}%</v-toolbar-title>
                    {{ loadingText }}
                    <v-progress-linear
                        stream
                        striped

                        :value="value"
                        :buffer-value="bufferValue"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>

export default {
    name: 'LoadingView',

    data()
    {
        return {
            value: 0,
            bufferValue: 0,
            bWaiting: true,
            loadingText: "Waiting ..."
        }
    },

    watch: {},

    created()
    {
        if (ipcRendererApi.send('require_scan_local_files'))
        {
            console.log("Send Msg")
            this.bWaiting = true
        }
    },

    mounted()
    {
        ipcRendererApi.on('reply_scan_local_files', function (event, bFinished, value, bufferValue, loadingText)
        {
            this.bWaiting = !bFinished

            this.bufferValue = bufferValue
            this.value = value
            this.loadingText = loadingText

            console.log(this.loadingText)
        }.bind(this))
    }
}

</script>