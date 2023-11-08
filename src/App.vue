<template>
    <v-app>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: () => ({ }),

    mounted()
    {
        this.$router.push("/loading")
    }
};

</script>

<style>
body
{
    user-select: none;
}
</style>