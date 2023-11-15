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

.folder-active-dis
{ }

.folder-active
{
    color: yellow;
}

.folder-no-active
{ }

</style>

<script>
export default {
    data: () => ({
        tree: [],
        items: [
            {
                id: 0,
                name: '.git',
            },
            {
                id: 1,
                name: 'node_modules',
            },
            {
                id: 2,
                name: 'public',
                children: [
                    {
                        id: 3,
                        name: 'public-1',
                    },
                ],
            },
        ],

        preOpened: [],
        opened: [],

        preActive: [],
        active: [],

        activeId: null,
    }),

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
            }
            else
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
        },
    },
}
</script>