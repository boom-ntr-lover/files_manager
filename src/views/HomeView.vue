<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="3"
                lg="2"
            >
                <!-- 左侧导航-->
                <v-card
                    elevation="0"
                >
                    <left-navigation></left-navigation>
                </v-card>
            </v-col>

            <v-col
                cols="9"
                lg="10"

                style="background-color: lightgray"
            >
                <router-view name="content"></router-view>
            </v-col>

            <v-col></v-col>
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
