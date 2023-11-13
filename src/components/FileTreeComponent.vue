<template>
    <div>
    </div>
</template>

<script>

export default {
    data()
    {
        return {
            waiting: false,
        }
    },

    components: {
    },

    created()
    {
        ipcRendererApi.on('reply_file_info_list', function (event, bLoaded)
        {
            this.waiting = false
        }.bind(this))

        if (ipcRendererApi.send('require_file_info_list'))
        {
            this.waiting = true
        }
    },
}
</script>
