<template>
    <v-dialog
        v-model="show_dialog"
        width="500"
    >
        <v-card>
            <v-container fluid>
                <v-row
                    align="center"
                >
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="values"
                            :items="items"
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
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "CreateArchiveInfo",

    props: ['input_name'],

    watch:
        {
        },

    data()
    {
        return {
            show_dialog: false,

            items: ['foo', 'bar', 'fizz', 'buzz'],
            values: ['foo', 'bar'],
            value: null,
        }
    },

    methods:
        {
            OpenDialog()
            {
                this.show_dialog = true
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