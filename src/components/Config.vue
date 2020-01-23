<template>
    <div class="configuration">
        <fieldset>
            <h4>General</h4>
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="baseTheme">
                            Base theme
                            <a href="#" v-tooltip.right="'Choose one of the themes below so you can use it as a base to your own theme. The current theme will be reseted.'">[?]</a>
                        </label>
                        <select @change="importFromSelect" class="form-control form-control-sm" id="baseTheme" name="baseTheme" v-model="baseTheme">
                            <option value=""></option>
                            <option :value="theme" v-for="theme in themes">{{ theme }}</option>
                        </select>
                        <small class="form-text text-muted" v-if="loadingBaseTheme">Loading theme...</small>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group">
                        <label for="theme_name">
                            Name
                            <a href="#" v-tooltip.right="'The name of your theme'">[?]</a>
                        </label>
                        <input autofocus class="form-control form-control-sm" id="theme_name" name="theme_name" type="text" v-model="themeName">
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                        <label for="preset">
                            Preset
                            <a href="#" v-tooltip.right="'A layout preset to help you customize the theme'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="preset" name="preset" v-model="currentPreset">
                            <option :value="preset.name" v-for="preset in presets">{{ preset.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                        <label for="view">
                            View
                            <a href="#" v-tooltip.right="'Select a view to see how your theme looks in differents parts of Keypirinha'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="view" name="view" v-model="currentView">
                            <option :value="view.id" v-for="view in views">{{ view.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="opacity_back">
                            Opacity
                            <a href="#" v-tooltip.right="'Value must be an integer in range [20, 100], with 20 being very transparent (barely usable) and 100 being fully opaque. Incorrect values will be forced to default.'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="opacity_back" max="100" min="20" name="opacity_back" type="number" v-model="theme.opacity_back">
                        <small class="form-text text-muted">Range: [20,100]</small>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="control_margin">
                            Control Margin
                            <a href="#" v-tooltip.right="'The distance between each element of the GUI (in pixels)'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="control_margin" max="50" min="2" name="control_margin" type="number" v-model="theme.control_margin">
                        <small class="form-text text-muted">Range: [2, 50]</small>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="textbox_padding">
                            Textbox padding
                            <a href="#" v-tooltip.right="'The distance between the border of a text box (edit control) and its text'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="textbox_padding" max="50" min="1" name="textbox_padding" type="number" v-model="theme.textbox_padding">
                        <small class="form-text text-muted">Range: [1, 50]</small>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="satellite_size">
                            Satellite size
                            <a href="#" v-tooltip.right="'Size of the satellite icon'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="satellite_size" name="satellite_size" v-model="theme.satellite_size">
                            <option value="small">small</option>
                            <option value="large">large</option>
                            <option value="jumbo">jumbo</option>
                            <option value="superjumbo">superjumbo</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="satellite_show">
                            Satellite show
                            <a href="#" v-tooltip.right="'When to show the contextual icon'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="satellite_show" name="satellite_show" v-model="theme.satellite_show">
                            <option value="always">always</option>
                            <option value="never">never</option>
                            <option value="select">select</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="satellite_pos">
                            Satellite pos.
                            <a href="#" v-tooltip.right="'Position of the satellite icon'">[?]</a>
                        </label>
                        <select :disabled="theme.satellite_show === 'never'" class="form-control form-control-sm" id="satellite_pos" name="satellite_pos" v-model="theme.satellite_pos">
                            <option value="topleft">topleft</option>
                            <option value="topcenter">topcenter</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_background">
                            Background color
                            <a href="#" v-tooltip.right="'The background color used in keypirinha\'s container'">[?]</a>
                        </label>
                        <color-picker v-model="theme.color_background"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_foreground">
                            Foreground color
                            <a href="#" v-tooltip.right="'The font color used in keypirinha'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_foreground" :inputid="'color_foreground'" v-model="theme.color_foreground"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_textbox_back">
                            Textbox backg.
                            <a href="#" v-tooltip.right="'Background color used in the text control'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_textbox_back" :inputid="'color_textbox_back'" v-model="theme.color_textbox_back"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_status">
                            Color status
                            <a href="#" v-tooltip.right="'Color of the text in the status bar'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_status" :inputid="'color_status'" v-model="theme.color_status"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_accent">
                            Color Accent
                            <a href="#" v-tooltip.right="'Background color used in the selelection mark when an item is selected'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_accent" :inputid="'color_accent'" v-model="theme.color_accent"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_warn">
                            Color warn
                            <a href="#" v-tooltip.right="'Applied to so-called ERROR items, which are special items sent by the plugins used to display any kind of warning/error message.'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_warn" :inputid="'color_warn'" v-model="theme.color_warn"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_large_size">
                            Font size (large)
                            <a href="#" v-tooltip.right="'Used for the title and the text control'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="font_large_size" min="1" name="font_large_size" type="number" v-model="theme.font_large_size">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_large_style">
                            Font style (large)
                            <a href="#" v-tooltip.right="'Used for the title and the text control'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="font_large_style" name="font_large_style" v-model="theme.font_large_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_title">
                            Color title
                            <a href="#" v-tooltip.right="'Color of the text located at the left side of the text box that is only displayed once an item has been selected with the Tab key.'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_title" :inputid="'color_title'" v-model="theme.color_title"/>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <h4>Layout</h4>
            <div class="row">
                <div class="col-lg-12">

                    <ul class="list-unstyled">
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_scrollbar" name="layout[]" type="checkbox" v-model="theme.layout" value="list_scrollbar">
                                <label class="form-check-label" for="layout_list_scrollbar">
                                    List Scrollbar <br>
                                    <span class="text-muted">The vertical scroll bar of the result list</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_icon" name="layout[]" type="checkbox" v-model="theme.layout" value="list_icon">
                                <label class="form-check-label" for="layout_list_icon">
                                    List icons <br>
                                    <span class="text-muted">The icons in the results list</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_dialnum" name="layout[]" type="checkbox" v-model="theme.layout" value="list_dialnum">
                                <label class="form-check-label" for="layout_list_dialnum">
                                    List dial nums <br>
                                    <span class="text-muted">Display the dial number at the right side of the result item</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_selmark" name="layout[]" type="checkbox" v-model="theme.layout" value="list_selmark">
                                <label class="form-check-label" for="layout_list_selmark">
                                    List selection mark <br>
                                    <span class="text-muted">The selection mark shown at the left side of an item in the results list</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_hits" name="layout[]" type="checkbox" v-model="theme.layout" value="list_hits">
                                <label class="form-check-label" for="layout_list_hits">
                                    List hits <br>
                                    <span class="text-muted">The number of hits for items that were already executed</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_list_actions" name="layout[]" type="checkbox" v-model="theme.layout" value="list_actions">
                                <label class="form-check-label" for="layout_list_actions">
                                    List actions <br>
                                    <span class="text-muted">In the list, the number of available actions (if any)</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" id="layout_status" name="layout[]" type="checkbox" v-model="theme.layout" value="status">
                                <label class="form-check-label" for="layout_status">
                                    Status <br>
                                    <span class="text-muted">The status bar at the bottom</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <h4>Results</h4>
            <div class="row">
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="listitem_padding">
                            Item padding
                            <a href="#" v-tooltip.right="'The distance between the top and bottom borders of a result item and its content'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="listitem_padding" max="50" min="1" name="listitem_padding" type="number" v-model="theme.listitem_padding">
                        <small class="form-text text-muted">Range: [1,50]</small>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_back">
                            Background color
                            <a href="#" v-tooltip.right="'Background color used for each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_back" :inputid="'color_listitem_back'" v-model="theme.color_listitem_back"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_title">
                            Title color
                            <a href="#" v-tooltip.right="'The color used in the title of each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_title" :inputid="'color_listitem_title'" v-model="theme.color_listitem_title"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_desc">
                            Description color
                            <a href="#" v-tooltip.right="'The color used in the description of each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_desc" :inputid="'color_listitem_desc'" v-model="theme.color_listitem_desc"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_tips">
                            Tips color
                        </label>
                        <ColorPicker :color="theme.color_listitem_tips" :inputid="'color_listitem_tips'" v-model="theme.color_listitem_tips"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="compact_results">
                            Compact results
                            <a href="#" v-tooltip.right="'This option allows to visually compact the results so only one line is required per result (small icon)'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="compact_results" name="compact_results" v-model="theme.compact_results">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="listitem_title_font">
                            Title font
                            <a href="#" v-tooltip.right="'The font to use for the title of an item in the results list'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="listitem_title_font" name="listitem_title_font" v-model="theme.listitem_title_font">
                            <option value="small">small</option>
                            <option value="snormal">snormal</option>
                            <option value="normal">normal</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_normal_size">
                            Font size (normal)
                            <a href="#" v-tooltip.right="'Used for the title and the text control only when the title is lengthy'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="font_normal_size" min="1" name="font_normal_size" type="number" v-model="theme.font_normal_size">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_normal_style">
                            Font style (normal)
                            <a href="#" v-tooltip.right="'Used for the title and the text control only when the title is lengthy'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="font_normal_style" name="font_normal_style" v-model="theme.font_normal_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_snormal_size">
                            Font size (snormal)
                            <a href="#" v-tooltip.right="'Used for the title part of the list item by default'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="font_snormal_size" min="1" name="font_snormal_size" type="number" v-model="theme.font_snormal_size">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_snormal_style">
                            Font style (snormal)
                            <a href="#" v-tooltip.right="'Used for the title part of the list item by default'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="font_snormal_style" name="font_snormal_style" v-model="theme.font_snormal_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_small_size">
                            Font size (small)
                            <a href="#" v-tooltip.right="'Used for list items and status bar'">[?]</a>
                        </label>
                        <input class="form-control form-control-sm" id="font_small_size" min="1" name="font_small_size" type="number" v-model="theme.font_small_size">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="font_small_style">
                            Font style (small)
                            <a href="#" v-tooltip.right="'Used for list items and status bar'">[?]</a>
                        </label>
                        <select class="form-control form-control-sm" id="font_small_style" name="font_small_style" v-model="theme.font_small_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <h4>Results (selected)</h4>
            <div class="row">
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_selected_back">
                            Background color
                            <a href="#" v-tooltip.right="'Background color used for each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_selected_back" :inputid="'color_listitem_selected_back'" v-model="theme.color_listitem_selected_back"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_selected_title">
                            Title color
                            <a href="#" v-tooltip.right="'The color used in the title of each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_selected_title" :inputid="'color_listitem_selected_title'" v-model="theme.color_listitem_selected_title"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_selected_desc">
                            Description color
                            <a href="#" v-tooltip.right="'The color used in the description of each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :color="theme.color_listitem_selected_desc" :inputid="'color_listitem_selected_desc'" v-model="theme.color_listitem_selected_desc"/>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="color_listitem_selected_tips">
                            Tips color
                        </label>
                        <ColorPicker :color="theme.color_listitem_selected_tips" :inputid="'color_listitem_selected_tips'" v-model="theme.color_listitem_selected_tips"/>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import ColorPicker from './ColorPicker.vue';

  export default {
    components: {ColorPicker},
    name: 'Config',
    data() {
      return {
        baseTheme: null,
        loadingBaseTheme: false,
      };
    },
    watch: {
      selectedTheme(theme) {
        this.baseTheme = theme;
      },
    },
    methods: {
      /**
       * Import the theme from the selection.
       */
      importFromSelect() {
        if (this.baseTheme) {
          this.importThemeFromFile(this.baseTheme);
        } else {
          this.resetTheme();
        }
      },
      ...mapActions(['importThemeFromFile']),
      ...mapMutations(['bulkUpdateTheme', 'setCurrentView', 'resetTheme']),
    },
    computed: {
      ...mapGetters([
        'theme',
        'themes',
        'presets',
        'views',
        'preset',
      ]),
      selectedTheme: {
        get() {
          return this.$store.state.selectedTheme;
        },
      },
      themeName: {
        get() {
          return this.$store.state.themeName;
        },
        set(value) {
          this.$store.commit('setThemeName', value);
        },
      },
      currentView: {
        get() {
          return this.$store.state.currentView;
        },
        set(value) {
          this.$store.commit('setCurrentView', value);
        },
      },
      currentPreset: {
        get() {
          return this.$store.state.preset;
        },
        set(value) {
          this.$store.commit('setPreset', value);
        },
      },
    },
  };
</script>
