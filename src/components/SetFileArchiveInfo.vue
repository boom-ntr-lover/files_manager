<template>
    <v-row justify="center">
        <create-archive-info
            ref="create_archive"
        >
        </create-archive-info>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span v-for="(fileLatter, index) in fileName" >
                        <v-chip
                            label
                            outlined
                            :color="selectedFileLatter.indexOf(index) === -1 ? 'grey lighten-2' : 'blue darken-1'"
                            @click="OnClickLatter(index)"
                        >
                            {{ fileLatter }}
                        </v-chip>
                    </span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row
                            v-if="archiveInfoList.length > 0"
                        >
                            <v-col
                                cols="12"
                            >
                                <!--匹配的档案信息-->
                                <v-simple-table
                                    dense
                                    height="140px"
                                >
                                    <template v-slot:default>
                                        <tbody>
                                        <tr
                                            v-for="archiveInfo in archiveInfoList"
                                            :key="archiveInfo.id"
                                        >
                                            <td>{{ archiveInfo.name }}</td>
                                            <td>{{ archiveInfo.score }}</td>
                                            <td>
                                                <v-btn
                                                    icon
                                                    color="indigo"
                                                    @click="AddFileInfoToArchive(archiveInfo)"
                                                >
                                                    <v-icon dark>
                                                        mdi-plus
                                                    </v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>

                            </v-col>
                        </v-row>

                        <v-row>
                            <v-btn
                                @click="CreateNewArchiveInfo"
                            >
                                CreateNew
                            </v-btn>
                        </v-row>
                    </v-container>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        关闭
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="SetFileToArchive"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import CreateArchiveInfo from './CreateArchiveInfo.vue'
import ArchiveInfo from "@/background/archive/ArchiveInfo";

export default {
    name: "SetFileArchiveInfo",

    components: {
        CreateArchiveInfo
    },

    data: () => ({
        dialog: false,
        fileInfo: null,
        fileName: '',
        searchName: '',

        loading: false,
        archiveInfoList: [],
        search: null,
        select: null,
        states: [
            'Alabama',
            'Alaska',
        ],

        selectedFileLatter: [],
    }),
    watch: {
        search(val)
        {
            val && val !== this.select && this.querySelections(val)
        },

        selectedFileLatter()
        {
            let queryName = ""
            for (let i = 0; i < this.fileName.length; i++)
            {
                if (i in this.selectedFileLatter)
                    queryName += this.fileName[i]
            }
            this.searchName = queryName
            ipcRendererApi.send('query_archive_info_list_by_name', queryName)
            this.loading = true
        }
    },

    created()
    {
        // 响应查询档案信息列表
        ipcRendererApi.on('reply_query_archive_info_list_by_name', function (event, archiveInfoList)
        {
            this.archiveInfoList = archiveInfoList
            this.loading = false
        }.bind(this))

        // 响应创建新的档案信息
        ipcRendererApi.on('reply_create_archive_info', function (event, err, res)
        {
            ipcRendererApi.send('query_archive_info_list_by_name', this.searchName)
        }.bind(this))

        // 响应追加文件到文档
        ipcRendererApi.on('reply_add_file_to_archive', function (event, res)
        {
            if (res)
            {
                this.dialog = false
            }
        }.bind(this))
    },

    methods:
        {
            SetFileInfo(fileInfo)
            {
                this.dialog = true
                this.fileInfo = fileInfo
                this.fileName = fileInfo.name

                // 猜测应当场出现的文件名
                this.selectedFileLatter = [0, 1, 2, 3]
            },

            OnClickLatter(index)
            {
                if (this.selectedFileLatter.indexOf(index) === -1)
                    this.selectedFileLatter.push(index)
                else
                    this.selectedFileLatter.splice(this.selectedFileLatter.indexOf(index), 1)
            },

            CreateNewArchiveInfo()
            {
                this.$refs.create_archive.OpenCreateArchiveDialog(this.fileInfo)
            },

            SetFileToArchive()
            {

            },

            AddFileInfoToArchive(archiveInfo)
            {
                ipcRendererApi.send('add_file_to_archive', {
                    fileInfo: this.fileInfo,
                    archiveInfo: archiveInfo
                })
            }
        }
}
</script>