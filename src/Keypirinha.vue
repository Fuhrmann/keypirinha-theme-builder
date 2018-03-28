<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="keypirinha" :style="keypirinhaStyle">
                    <SearchBox/>
                    <ListItem/>
                    <StatusBar/>
                </div>
            </div>
            <div class="col-lg-12">
                <Config/>
            </div>
        </div>
        <div class="row justify-content-lg-center">
            <div class="col col-lg-auto">
                <p>
                    Made with <span style="color: #e25555;">&hearts;</span> by
                    <a href="https://github.com/Fuhrmann" target="_blank">Fuhrmann</a>
                    |
                    <a href="https://github.com/Fuhrmann/keypirinha-theme-builder" target="_blank">Github</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from './components/Config.vue'
    import ListItem from './components/ListItem.vue'
    import StatusBar from './components/StatusBar.vue'
    import SearchBox from './components/SearchBox.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'keypirinha',
        data() {
            return {
                themeImport: null,
            }
        },
        components: {Config, ListItem, StatusBar, SearchBox},
        computed: {
            ...mapGetters([
                'theme',
                'themeName',
                'keypirinhaStyle',
                'currentView'
            ]),
            themes: {
                get() {
                    return this.$store.state.themes;
                },
                set(themes) {
                    this.$store.commit('setThemes', themes);
                }
            }
        },
        mounted() {
            // Load the available themes
            fetch('themes.json').then((stream) => {
                return stream.json()
            }).then((data) => {
                this.themes = data;
            })
        }
    }
</script>
