<template>
    <v-dialog
        v-model="show_dialog"
        width="500"

        persistent
    >
        <v-card>
            <v-container fluid>
                <v-row
                >
                    <v-col cols="12">
                        <v-text-field label="Name" v-model="input_name"></v-text-field>
                    </v-col>
                </v-row>

                <v-row
                >
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="values"
                            :items="tag_items"
                            dense
                            chips
                            small-chips
                            label="Solo"
                            multiple
                            solo
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="show_dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="show_dialog = false"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "CreateArchiveInfo",

    watch:
        {
            tag_infos()
            {
                this.tag_items = this.tag_infos.map((tag_info) => tag_info.name)
            }
        },

    data()
    {
        return {
            show_dialog: false,

            tag_infos: ['foo', 'bar', 'fizz', 'buzz'],
            tag_items: [],

            values: ['foo', 'bar'],
            value: null,

            waiting_tags: false,

            input_name: "",

            // 创建自 FileInfo
            create_from_file_info: null,
        }
    },

    created()
    {
        if (ipcRendererApi.send('require_tag_list'))
        {
            this.waiting_tags = true
        }
    },

    mounted()
    {
        ipcRendererApi.on('reply_tag_list', function (event, args)
        {
            this.tag_infos = args
            this.waiting_tags = false
        }.bind(this))
    },

    methods:
        {
            OpenCreateArchiveDialog(fromFileInfo)
            {
                this.show_dialog = true
                this.create_from_file_info = fromFileInfo

                if (this.create_from_file_info)
                {
                    this.input_name = this.create_from_file_info.name
                }
            },

            CreateArchiveInfo()
            {
                // let newArchiveInfo = new ArchiveInfo()
                // newArchiveInfo.name = this.searchName
                // ipcRendererApi.send('create_archive_info', newArchiveInfo)
            }
        }
}
</script>