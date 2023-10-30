
<template>
    <v-btn
        :loading="loading"
        class="flex-grow-1"
        height="48"
        variant="tonal"
        @click="count++"
    >
        Count is: {{ count }}
    </v-btn>
</template>

<style scoped>

</style>

<script>

export default {
    data: () => ({
        loading: false,
        count: 0,
    }),

    props: {
        msg: String
    },

    methods: {
        load () {
            this.loading = true
            setTimeout(() => (this.loading = false), 3000)
        },
    },
}

</script>
