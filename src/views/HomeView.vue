<template>
    <div>
        <archive-table-component v-if="!waiting"/>
    </div>
</template>

<script>
import ArchiveTableComponent from '../components/ArchiveTableComponent'

export default {
    name: 'HomeView',

    data()
    {
        return {
            waiting: true,
        }
    },

    components: {
        ArchiveTableComponent,
    },

    created()
    {
        if (ipcRendererApi.send('check_archive_loaded'))
        {
            this.waiting = true
        }
    },

    mounted()
    {
        ipcRendererApi.on('reply_archive_loaded', function (event, bLoaded)
        {
            this.waiting = false
            if (bLoaded)
            {

            }
            else
            {
                // TODO 逻辑有问题， Login 需要考虑顺序
                // this.$router.push("/login")
            }
        }.bind(this))
    },
}
</script>
