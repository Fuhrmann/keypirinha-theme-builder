<template>
    <div>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <img src="themes/icon.png" alt="" width="24" height="24">
            <h5 class="my-0 font-weight-normal text-center ml-3">
                Theme builder <span class="text-muted">for Keypirinha launcher</span>
            </h5>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="sticky">
                        <div :style="keypirinhaStyle" class="keypirinha">
                            <SearchBox/>
                            <ListItem/>
                            <StatusBar/>
                        </div>

                        <div class="options">
                            <div class="form-group mt-3">
                                <button @click="showImportModal" class="btn btn-secondary mr-2 btn-sm" type="button">Import theme</button>
                                <button @click="selectRandomTheme" class="btn btn-secondary btn-sm" type="button">Random theme</button>
                                <button @click="downloadTheme" class="float-right btn btn-primary btn-sm" type="button">Download theme</button>
                            </div>
                            <div class="mt-1">
                                <p>
                                    Made with <span style="color: #e25555;">&hearts;</span> by
                                    <a href="https://github.com/Fuhrmann" target="_blank">Fuhrmann</a>
                                    |
                                    <a href="https://github.com/Fuhrmann/keypirinha-theme-builder" target="_blank">Github</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <Config/>
                </div>
            </div>

            <!--Import modal-->
            <modal @close="closeImportModal" v-show="isModalImportVisible">
                <h5 slot="header">Import theme</h5>
                <div slot="body">
                    <form action="#">
                        <textarea class="form-control" cols="30" id="theme" name="theme" placeholder="Paste your theme here..." rows="10" v-model="themeImportText"></textarea>
                    </form>
                </div>
                <div slot="footer">
                    <button :disabled="!themeImportText" @click="importFromModal" class="btn btn-primary" type="button">Import</button>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
  import Config from './components/Config.vue';
  import ListItem from './components/ListItem.vue';
  import StatusBar from './components/StatusBar.vue';
  import SearchBox from './components/SearchBox.vue';
  import Modal from './components/Modal.vue';
  import {mapActions, mapGetters} from 'vuex';
  import * as Stickyfill from 'stickyfilljs';

  export default {
    name: 'keypirinha',
    data() {
      return {
        themeImport: null,
        themeImportText: null,
        isModalImportVisible: false,
      };
    },
    components: {Config, ListItem, StatusBar, SearchBox, Modal},
    mounted() {
      // sticky keypirinha
      Stickyfill.add(document.querySelectorAll('.sticky'));

      // Load the available themes
      fetch('themes.json').then((stream) => {
        return stream.json();
      }).then((data) => {
        this.themes = data;
      }).catch((e) => {
        console.error('Could not load themes.');
      });
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

      /**
       * Download the theme.
       */
      downloadTheme() {
        let theme = `[theme/${this.themeName}]\r\n`;
        for (let key of Object.keys(this.theme)) {
          theme += `${key} = ${this.theme[key]}\r\n`;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(theme));
        element.setAttribute('download', `${this.themeName.toLowerCase()}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },

      /**
       * Shows the modal to import a custom theme.
       */
      showImportModal() {
        this.isModalImportVisible = true;
      },

      /**
       * Select a random theme as a base theme.
       */
      selectRandomTheme() {
        const randomTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        this.importThemeFromFile(randomTheme);
      },

      /**
       * Closes the import modal.
       */
      closeImportModal() {
        this.isModalImportVisible = false;
      },

      /**
       * Do import from modal.
       */
      importFromModal() {
        this.importFromUser(this.themeImportText);
        this.closeImportModal();
      },

      /** Map all actions from store **/
      ...mapActions(['importThemeFromFile', 'importFromUser']),
    },
    computed: {
      ...mapGetters([
        'theme',
        'themeName',
        'keypirinhaStyle',
        'currentView',
      ]),
      /**
       * The current theme name.
       */
      themeName: {
        get() {
          return this.$store.state.themeName;
        },
      },

      /**
       * List of all available themes.
       */
      themes: {
        get() {
          return this.$store.state.themes;
        },
        set(themes) {
          this.$store.commit('setThemes', themes);
        },
      },

      /**
       * The current selected base theme.
       */
      selectedTheme: {
        get() {
          return this.$store.state.selectedTheme;
        },
      },
    },
  };
</script>
