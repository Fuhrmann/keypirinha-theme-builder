<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <a @click.prevent="setPreviousTheme" class="previous-theme theme-nav-arrow" href="" title="Previous theme" v-show="selectedTheme">&#x27A9;</a>
                <div :style="keypirinhaStyle" class="keypirinha">
                    <SearchBox/>
                    <ListItem/>
                    <StatusBar/>
                </div>
                <a @click.prevent="setNextTheme" class="next-theme theme-nav-arrow" href="" title="Next theme">&#x27A9;</a>
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
  import Config from './components/Config.vue';
  import ListItem from './components/ListItem.vue';
  import StatusBar from './components/StatusBar.vue';
  import SearchBox from './components/SearchBox.vue';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'keypirinha',
    data() {
      return {
        themeImport: null,
      };
    },
    components: {Config, ListItem, StatusBar, SearchBox},
    computed: {
      ...mapGetters([
        'theme',
        'themeName',
        'keypirinhaStyle',
        'currentView',
      ]),
      themes: {
        get() {
          return this.$store.state.themes;
        },
        set(themes) {
          this.$store.commit('setThemes', themes);
        },
      },
      selectedTheme: {
        get() {
          return this.$store.state.selectedTheme;
        },
      },
    },
    methods: {
      setNextTheme() {
        let newTheme = this.searchTheme(true);
        this.importThemeFromFile(newTheme);
      },
      setPreviousTheme() {
        let newTheme = this.searchTheme(false);
        this.importThemeFromFile(newTheme);
      },
      searchTheme(next) {
        const themes = this.$store.state.themes;

        let index = themes.indexOf(this.$store.state.selectedTheme);
        let nextTheme = themes[0];
        if (index >= 0 && index < themes.length - 1) {
          const newIndex = next == true ? index + 1 : index - 1;
          nextTheme = themes[newIndex];
        }

        if (typeof nextTheme == 'undefined') nextTheme = 'CustomTheme';

        return nextTheme;
      },
      ...mapActions(['importThemeFromFile']),
    },
    mounted() {
      // Load the available themes
      fetch('themes.json').then((stream) => {
        return stream.json();
      }).then((data) => {
        this.themes = data;
      }).catch((e) => {
        console.error('Could not load themes.');
      });
    },
  };
</script>
