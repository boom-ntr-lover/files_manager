<template>
    <v-card
        elevation="0"
    >
        <set-file-archive-info
            ref="set_archive_dialog"
        ></set-file-archive-info>

        <v-virtual-scroll
            :bench="benched"
            :items="indexs"
            height="500"
            item-height="44"
        >
            <template v-slot:default="{ index }">
                <v-list-item :key="index">

                    <v-card
                        elevation="0"
                        class="pa-0 ma-0"
                    >
                        {{ archiveInfoList[index].fileName }}

                        <v-btn
                            @click="AddToArchive(index)"
                        >
                            Add
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
    name: "ArchiveView",
    components:
        {
        },

    data: () => ({
        archiveInfoList: {}
    }),

    computed: {
        indexs()
        {
            return Array.from({ length: this.archiveInfoList.length}, (k, v) => v)
        },
    },

    mounted()
    {
    },

    created()
    {
        // ipcRendererApi.on('reply_append_file_info_list', function (event, folderInfo)
        // {
        //     this.waiting = false
        // }.bind(this))
    },

    methods:
        {
            playFile(index)
            {
                // ipcRendererApi.send('play_file', this.archiveInfoList[index].absPath)
            }
        }
}
</script>