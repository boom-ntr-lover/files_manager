const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],

    lintOnSave: false,

    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
        }
    },
})
