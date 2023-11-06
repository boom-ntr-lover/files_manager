<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="archiveInfos"
            item-key="name"
            class="elevation-1"
            hide-default-footer
            :search="search"
            :custom-filter="filterOnlyCapsText"
        >
        </v-data-table>
    </div>
</template>
<script>

export default {
    data()
    {
        return {
            waiting: true,

            search: '',
            calories: '',

            // Table Of ArchiveInfo
            archiveInfos: [],
        }
    },

    watch: {},

    created()
    {
        if (ipcRendererApi.send('get_archive_info', {
            order_by: 'id',
        }))
        {
            console.log("Send Msg")
            this.waiting = true
        }
    },

    mounted()
    {
        ipcRendererApi.on('reply_archive_info', function (event, args)
        {
            setTimeout(() => (this.waiting = false), 1000)

            this.archiveInfos = args

        }.bind(this))
    },

    computed:
        {
            headers()
            {
                return [
                    {
                        text: '编号',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: '标签', value: 'tags'},
                ]
            },
        },

    methods:
        {
            filterOnlyCapsText(value, search, item)
            {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
        }
}

</script>

