<template>
    <div class="searchbox" :style="searchBoxStyle">
        <div class="logo-anchor" :style="satelliteAnchorStyle">
            <div class="logo" :style="satelliteIconStyle">
                <img src="src/images/logo.png">
            </div>
        </div>
        <div class="input">Keypirinha</div>
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
        }
    }
</script>
