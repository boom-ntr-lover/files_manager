<template>
    <v-card
        elevation="0"
    >

        <v-virtual-scroll
            :bench="benched"
            :items="indexs"
            height="500"
            item-height="32"
        >
            <template v-slot:default="{ index }">
                <v-list-item :key="index">

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ fileInfoList[index].fileName }}
                        </v-list-item-title>
                    </v-list-item-content>

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
        ipcRendererApi.on('reply_file_info_list', function (event, fileInfoList)
        {
            this.waiting = false

            if (!fileInfoList)
                return;

            this.fileInfoList = fileInfoList

        }.bind(this))

        if (ipcRendererApi.send('require_file_info_list'))
        {
            this.waiting = true
        }
    },
}
</script>