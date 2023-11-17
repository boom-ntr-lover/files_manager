<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5"> {{ fileInfo ? fileInfo.fileName : '' }} </span>
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
                                    label="What state are you from?"
                                    solo-inverted
                                ></v-autocomplete>

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

        loading: false,
        items: [],
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

    methods:
        {
            SetFileInfo(fileInfo)
            {
                this.dialog = true
                this.fileInfo = fileInfo

                // 获取一个近似的 Archive
                // fileInfo
            },

            SetFileToArchive()
            {
            },
            querySelections(v)
            {
                this.loading = true
                // Simulated ajax query
                setTimeout(() =>
                {
                    this.items = this.states.filter(e =>
                    {
                        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            },
        }
}
</script>