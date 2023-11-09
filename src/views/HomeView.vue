<template>
    <div>
        <v-card
            class="d-flex flex-row mb-6"
            flat
            tile
        >
            <!-- 左侧导航-->
            <v-card
                class="pa-2"
                outlined
                tile
            >
                <left-navigation>
                </left-navigation>
            </v-card>

            <!-- 内容-->
            <v-card
                class="d-inline-flex pa-8"
                outlined
                tile
            >
                <router-view class="view main-content" name="content"></router-view>
            </v-card>

        </v-card>
    </div>
</template>

<script>
import LeftNavigation from "@/components/LeftNavigation.vue";

export default {
    name: 'HomeView',

    components: {
        LeftNavigation,
    },

    data()
    {
        return {}
    },
}
</script>
