<template>
    <v-treeview
        v-model="tree"
        :open="initiallyOpen"
        :items="items"
        activatable
        item-key="name"
        open-on-click

        class="text-caption"
        dense
    >

        <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file" class="text-md-body-1">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>

            <v-icon v-else class="text-md-body-1">
                {{ files[item.file] }}
            </v-icon>
        </template>

    </v-treeview>
</template>

<script>
export default {
    data: () => ({
        initiallyOpen: ['public'],
        files: {
            html: 'mdi-language-html5',
            js: 'mdi-nodejs',
            json: 'mdi-code-json',
            md: 'mdi-language-markdown',
            pdf: 'mdi-file-pdf',
            png: 'mdi-file-image',
            txt: 'mdi-file-document-outline',
            xls: 'mdi-file-excel',
        },
        tree: [],
        items: [
            {
                name: '.git',
            },
            {
                name: 'node_modules',
            },
            {
                name: 'public',
                children: [
                    {
                        name: 'static',
                        children: [{
                            name: 'logo.png',
                            file: 'png',
                        }],
                    },
                    {
                        name: 'favicon.ico',
                        file: 'png',
                    },
                    {
                        name: 'index.html',
                        file: 'html',
                    },
                ],
            },
            {
                name: '.gitignore',
                file: 'txt',
            },
            {
                name: 'babel.config.js',
                file: 'js',
            },
            {
                name: 'package.json',
                file: 'json',
            },
            {
                name: 'README.md',
                file: 'md',
            },
            {
                name: 'vue.config.js',
                file: 'js',
            },
            {
                name: 'yarn.lock',
                file: 'txt',
            },
        ],
    }),
}
</script>