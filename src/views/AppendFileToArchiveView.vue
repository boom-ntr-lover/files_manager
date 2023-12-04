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
                        {{ fileInfoList[index].fileName }}

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
import SetFileArchiveInfo from "../components/SetFileArchiveInfo";

export default {
    name: "AppendFileToArchiveView",
    components:
        {
            SetFileArchiveInfo,
        },

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
        ipcRendererApi.on('reply_append_file_info_list', function (event, folderInfo)
        {
            this.waiting = false

            if (!folderInfo)
                return;

            this.fileInfoList = folderInfo.fileInfoList

            // 过滤当前没有所属 Archive Info 的
            this.fileInfoList = this.fileInfoList.filter(function (fileInfo)
            {
                return fileInfo.pArchiveInfo == null
            })

        }.bind(this))

        // 响应追加文件到文档
        ipcRendererApi.on('reply_add_file_to_archive', function (event, res, fileInfo, archiveInfo)
        {
            if (res)
            {
                let removeId = fileInfo.id
                for (let i = 0; i < this.fileInfoList.length; i++)
                {
                    let filterFileInfo = this.fileInfoList[i]
                    if (filterFileInfo.id === removeId)
                    {
                        this.fileInfoList.splice(i, 1)
                        break
                    }
                }

                console.log(this.fileInfoList.length)
            }

        }.bind(this))
    },

    methods:
        {
            playFile(index)
            {
                ipcRendererApi.send('play_file', this.fileInfoList[index].absPath)
            },

            AddToArchive(index)
            {
                let fileInfo = this.fileInfoList[index]
                if (fileInfo)
                {
                    this.$refs.set_archive_dialog.SetFileInfo(fileInfo)
                }
            }
        }
}
</script>