<template>
    <v-navigation-drawer
        permanent
        expand-on-hover
    >
        <v-card
            class="mx-auto"
            max-width="300"
            tile
        >

            <v-divider></v-divider>
            <v-list dense>
                <v-list-item-group
                    v-model="viewSelectItem"
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="item.key"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

            </v-list>
            <v-divider></v-divider>

        </v-card>

    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        viewSelectItem: '',
        items: [
            {
                key: 'archive_view',
                text: 'ArchiveView',
                icon: 'mdi-clock'
            },
            {
                key: 'file_view',
                text: 'FileView',
                icon: 'mdi-account',
            },
            {
                key: 'real_file_tree',
                text: 'FileView',
                icon: 'mdi-account',
            },
            {
                key: 'no_add_file_view',
                text: 'FileView',
                icon: 'mdi-account',
            },
        ],
    }),
}
</script>