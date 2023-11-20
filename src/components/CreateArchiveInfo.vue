<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    Click Me
                </v-btn>
            </template>

            <v-card>
                <v-container fluid>
                    <v-row
                        align="center"
                    >
                        <v-col cols="12">
                            <v-autocomplete
                                v-model="values"
                                :items="items"
                                dense
                                chips
                                small-chips
                                label="Solo"
                                multiple
                                solo
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: "CreateArchiveInfo",

    data()
    {
        return {
            dialog: false,

            items: ['foo', 'bar', 'fizz', 'buzz'],
            values: ['foo', 'bar'],
            value: null,
        }
    },
}
</script>