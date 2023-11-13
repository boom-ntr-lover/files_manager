<template>
    <v-navigation-drawer
        floating
        permanent
    >

        <v-container>
            <v-row>
                <v-col>
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
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- 文件夹列表-->
                    <router-view class="view main-content" name="file_tree"></router-view>
                </v-col>
            </v-row>

        </v-container>

    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        viewSelectItem: -1,
        items: [
            {
                key: 'archive_view',
                text: 'ArchiveView',
                icon: 'mdi-emoticon-kiss-outline',
                path: '/archive_view',
            },
            {
                key: 'real_file_tree',
                text: 'RealFileTree',
                icon: 'mdi-file-tree-outline',
                path: '/real_file_tree',
            },
            {
                key: 'append_file_to_archive_view',
                text: 'NeedAddFile',
                icon: 'mdi-emoticon-poop',
                path: '/append_file_to_archive_view',
            },
        ],
    }),

    watch: {
        viewSelectItem()
        {
            this.changeView()
        }
    },

    created()
    {
        this.viewSelectItem = 2
    },

    methods:
        {
            changeView()
            {
                let targetCfg = this.items[this.viewSelectItem]
                if (targetCfg != null)
                {
                    this.$router.push("/home" + targetCfg.path)
                }
            }
        }
}
</script>