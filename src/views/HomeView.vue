<template>
    <v-card
        class="d-flex flex-row mb-6"
        flat
        tile
    >
        <!-- 左侧导航-->
        <v-card
            class="md-1"
            outlined
            tile
        >
            <left-navigation></left-navigation>

        </v-card>

        <router-view class="view main-content" name="content"></router-view>

    </v-card>
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
