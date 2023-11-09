<template>
    <div>
        <left-navigation></left-navigation>
        <router-view class="view main-content" name="content"></router-view>
<!--        <file-tree-component/>-->
    </div>
</template>

<script>
import LeftNavigation from "@/components/LeftNavigation.vue";
// import FileTreeComponent from "@/components/FileTreeComponent.vue";

export default {
    name: 'HomeView',

    components: {
        LeftNavigation,
        // FileTreeComponent,
    },

    data()
    {
        return {
        }
    },

    created()
    {
    },

    mounted()
    {
    },
}
</script>
