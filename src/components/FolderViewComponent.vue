<template>
    <v-treeview
        class="text-caption"

        v-model="tree"
        :items="items"
        :active="active"
        :open="opened"

        return-object
        open-on-click
        activatable
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

        rootFolderInfo: null,
        preOpenedId: [],
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

            this.rootFolderInfo = rootFolderInfo
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

        TreeViewOpen(items)
        {
            // // Active
            // let activeItem
            // if (items.length > 0)
            // {
            //     if (this.preOpenedId && this.preOpenedId.length > 0)
            //     {
            //         for (let i_item = 0; i_item < items.length; i_item++)
            //         {
            //             let preOpened = false
            //             let item = items[i_item]
            //             for (let i = 0; i < this.preOpenedId.length; i++)
            //             {
            //                 let preOpenedId = this.preOpenedId[i]
            //                 if (preOpenedId === item.id)
            //                 {
            //                     preOpened = true
            //                     break
            //                 }
            //             }
            //             if (!preOpened)
            //             {
            //                 activeItem = item
            //                 break
            //             }
            //         }
            //     }
            //     else
            //     {
            //         activeItem = items[0]
            //     }
            // }
            // else
            // {
            //     activeItem = this.preOpenedId[0]
            // }
            //
            // this.preOpenedId = []
            // for (let i = 0; i < items.length; i++)
            // {
            //     let item = items[i]
            //     this.preOpenedId.push(item.id)
            // }
            // console.log(this.preOpenedId)
            //
            // if (activeItem)
            //     this.ActiveItemAction(activeItem)
        },

        ActiveItemAction(item)
        {
            if (this.activeId === item.id)
                return

            this.activeId = item.id

            console.log("TreeViewOpen ", this.activeId);

            if (ipcRendererApi.send('require_append_file_info_list', {
                folderId: this.activeId,
            }))
            {
                this.waiting = true
            }
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