<template>
    <v-treeview
        class="text-caption"

        v-model="tree"
        :items="items"
        :active="active"
        :open="opened"

        return-object
        open-on-click
        dense

        item-key="name"
        active-class="folder-active-dis"

        @update:active="TreeViewActive"
        @update:open="TreeViewOpen"
    >

        <template v-slot:prepend="{ item, open, active, indeterminate }">
            <v-icon>
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
        </template>

        <template v-slot:label="{ item, open, active, indeterminate }">
            <v-btn
                :color="activeId === item.id ? 'red' : 'gray'"

                elevation="0"
                block
                plain
                small
            >
                {{ item.name }}
            </v-btn>

        </template>

    </v-treeview>
</template>

<style>

.folder-active-dis { }

.folder-active {
    color: Red;
}

.folder-no-active { }

</style>

<script>
export default {
    data: () => ({
        tree: [],
        items: [
            {
                id: 0,
                name: './',
            },
        ],

        preOpened: [],
        opened: [],

        preActive: [],
        active: [],

        activeId: null,
    }),

    mounted()
    {
        ipcRendererApi.on('reply_folder_list', function (event, rootFolderInfo)
        {
            if (!rootFolderInfo)
                return;

            console.log(rootFolderInfo)

            this.items = []
            this.LoadFolderInfo(this.items, rootFolderInfo)
        }.bind(this))

        ipcRendererApi.send('require_folder_list')
    },

    methods: {
        TreeViewActive(item)
        {
            if (item.length === 0)
            {
                if (this.preActive.length > 0)
                {
                    this.active = this.preActive
                }
                return
            }

            this.preActive = []
            this.preActive.push(item[0])

            // Active
            this.ActiveItemAction(item[0])
        },

        TreeViewOpen(item)
        {
            // Active
            let activeItem
            if (item.length > 0)
            {
                activeItem = item[0]
                this.preOpened = item
            } else
            {
                activeItem = this.preOpened[0]
            }

            if (activeItem)
                this.ActiveItemAction(activeItem)
        },

        ActiveItemAction(item)
        {
            if (this.activeId === item.id)
                return

            this.activeId = item.id
            console.log("TreeViewOpen ", this.activeId);

            // if (ipcRendererApi.send('require_append_file_info_list', {
            //     order_by: 'id',
            // }))
            // {
            //     console.log("Send Msg")
            //     this.waiting = true
            // }
        },

        ///@param FolderInfo
        LoadFolderInfo(items, folderInfo)
        {
            let item = {
                id: folderInfo.id,
                name: folderInfo.folderName,
                children: [],
            }
            items.push(item)

            let childFolder = folderInfo.childFolder
            childFolder.forEach(element => {
                this.LoadFolderInfo(item.children, element)
            });
        }
    },
}
</script>