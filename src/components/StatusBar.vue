<template>
    <div class="status-bar" :style="statusBarStyle" v-if="theme.layout.indexOf('status') > -1">
        X items in catalog • x packages • Keypirinha x.x.x
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'StatusBar',
        computed: {
            ...mapGetters([
                'theme',
                'statusBarStyle'
            ]),
        }
    }
</script>
