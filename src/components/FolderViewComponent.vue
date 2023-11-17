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
<!--            <v-btn-->
<!--                :color="activeId === item.id ? 'red' : 'gray'"-->

<!--                elevation="0"-->
<!--                plain-->
<!--                small-->
<!--            >-->
<!--                {{ item.name }}-->
<!--            </v-btn>-->

            <div
                :class="activeId === item.id ? 'folder-active' : 'folder-no-active'">

                {{ item.name }}
            </div>

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
        preOpenedId: {},
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
            this.ActiveItemAction(item[0].id)
        },

        TreeViewOpen(items)
        {
            // Get item 和 preOpenedId 之间的差异ID
            let activeId = -1
            // 检查新增
            for (let i = 0; i < items.length; i++)
            {
                let item = items[i]
                let itemId = item.id
                if (!this.preOpenedId[itemId])
                {
                    activeId = itemId
                    break
                }
            }

            // 检查关闭
            if (activeId === -1)
            {
                for(let i = 0, keys=Object.keys(this.preOpenedId); i < keys.length; i++)
                {
                    let id = parseInt(keys[i])
                    let opening = false
                    for (let j = 0; j < items.length; j++)
                    {
                        let item = items[j]
                        if (item.id === id)
                        {
                            opening = true
                            break
                        }
                    }
                    if (!opening)
                        activeId = id
                }
            }

            this.preOpenedId = {}
            for (let i = 0; i < items.length; i++)
            {
                let item = items[i]
                this.preOpenedId[item.id] = true
            }

            if (activeId >= 0)
                this.ActiveItemAction(activeId)
        },

        ActiveItemAction(activeId)
        {
            if (this.activeId === activeId)
                return

            this.activeId = activeId

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