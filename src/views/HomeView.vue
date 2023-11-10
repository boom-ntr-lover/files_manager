<template>
    <v-container class="grey lighten-5">
        <v-row no-gutters>
            <v-col
                cols="6"
                md="4"
            >
                <!-- 左侧导航-->
                <v-card
                    elevation="0"
                    class="md-1"
                >
                    <left-navigation></left-navigation>
                </v-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
                md="8"
            >
                <v-card
                    elevation="0"
                    class="md-9"
                    outlined
                >
                    <router-view class="view main-content" name="content"></router-view>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
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
