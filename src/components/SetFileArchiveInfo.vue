<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5"> {{ fileName }} </span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-autocomplete
                                    v-model="select"
                                    :loading="loading"
                                    :items="items"
                                    :search-input.sync="search"
                                    cache-items
                                    class="mx-4"
                                    flat
                                    hide-no-data
                                    hide-details
                                    label="Select Archive"
                                    solo-inverted
                                >
                                </v-autocomplete>

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
export default {
    name: "SetFileArchiveInfo",

    data: () => ({
        dialog: false,
        fileInfo: null,
        fileName: '',

        loading: false,
        items: [],
        searchInput: "",
        search: null,
        select: null,
        states: [
            'Alabama',
            'Alaska',
        ],

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
            this.items = []
            archiveInfoList.forEach(archiveInfo =>
            {
                let archiveName = archiveInfo.name
                if ((archiveName || '').toLowerCase().indexOf((this.searchInput || '').toLowerCase()) > -1)
                {
                    this.items.push(archiveName)
                }
            })

            this.loading = false
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
            },

            SetFileToArchive()
            {
            },

            querySelections(v)
            {
                this.searchInput = v
                ipcRendererApi.send('query_archive_info_list_by_name')
                this.loading = true
            },
        }
}
</script>