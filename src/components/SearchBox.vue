<template>
    <div class="searchbox" :style="searchBoxStyle">
        <div class="logo-anchor" :style="satelliteAnchorStyle">
            <div class="logo" :style="satelliteIconStyle">
                <img src="src/images/logo.png">
            </div>
        </div>
        <div class="input">{{ themeName}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'StatusBar',
        computed: {
            ...mapGetters([
                'searchBoxStyle',
                'satelliteAnchorStyle',
                'satelliteIconStyle'
            ]),
            themeName: {
                get() {
                    return this.$store.state.themeName;
                }
            },
        }
    }
</script>
