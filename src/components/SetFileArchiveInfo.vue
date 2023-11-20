<template>
    <v-row justify="center">
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
                        <v-row>
                            <v-col
                                cols="12"
                            >

                                <v-simple-table
                                    dense
                                    height="140px"
                                >
                                    <template v-slot:default>
                                        <tbody>
                                        <tr
                                            v-for="item in items"
                                            :key="item.id"
                                        >
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.score }}</td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>


                            </v-col>
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

export default {
    name: "SetFileArchiveInfo",

    components: {
        CreateArchiveInfo
    },

    data: () => ({
        dialog: false,
        fileInfo: null,
        fileName: '',

        loading: false,
        items: [],
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
    },

    created()
    {
        ipcRendererApi.on('reply_query_archive_info_list_by_name', function (event, archiveInfoList)
        {
            this.items = archiveInfoList
            this.loading = false

            // 执行猜测名称

        }.bind(this))
    },

    methods:
        {
            SetFileInfo(fileInfo)
            {
                this.dialog = true
                this.fileInfo = fileInfo

                let names = this.fileInfo.fileName.split('.')
                if (names.length === 0)
                    return

                this.fileName = names[0]

                ipcRendererApi.send('query_archive_info_list_by_name', this.fileName)
                this.loading = true
            },

            OnClickLatter(index)
            {
                if (this.selectedFileLatter.indexOf(index) === -1)
                    this.selectedFileLatter.push(index)
                else
                    this.selectedFileLatter.splice(this.selectedFileLatter.indexOf(index), 1)
            },

            SetFileToArchive()
            {

            }
        }
}
</script>