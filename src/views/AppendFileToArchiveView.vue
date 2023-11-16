<template>
    <v-card
        elevation="0"
    >

        <v-virtual-scroll
            :bench="benched"
            :items="indexs"
            height="500"
            item-height="46"
        >
            <template v-slot:default="{ index }">
                <v-list-item :key="index">

                        <v-card
                            elevation="0"
                            class="pa-0 ma-0"
                        >
                            {{ fileInfoList[index].fileName }}
                            <v-btn
                                elevation="2"
                                @click="playFile(index)"
                            >
                                Play
                            </v-btn>
                        </v-card>

                </v-list-item>

                <v-divider></v-divider>
            </template>
        </v-virtual-scroll>

    </v-card>
</template>

<script>
export default {
    data: () => ({
        benched: 0,

        fileInfoList: {}
    }),

    computed: {
        indexs()
        {
            return Array.from({ length: this.fileInfoList.length}, (k, v) => v)
        },
    },

    mounted()
    {
        this.benched = 0
    },

    created()
    {
        ipcRendererApi.on('reply_append_file_info_list', function (event, fileInfoList)
        {
            this.waiting = false

            if (!fileInfoList)
                return;

            this.fileInfoList = fileInfoList

        }.bind(this))
    },

    methods:
    {
        playFile(index)
        {
            ipcRendererApi.send('test_play_file', this.fileInfoList[index].absPath)
        }
    }
}
</script>