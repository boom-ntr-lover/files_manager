<template>
    <v-card
        class="d-flex flex-row mb-6"
        flat
        tile
    >
        <!-- 左侧导航-->
        <v-card
            elevation="0"
            class="md-1"
        >
            <left-navigation></left-navigation>
        </v-card>

        <v-card
            elevation="0"
            class="md-9"
            outlined
        >
            <router-view class="view main-content" name="content"></router-view>
        </v-card>

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
