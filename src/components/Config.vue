<template>
    <div class="configuration">
        <fieldset>
            <legend>General</legend>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="theme_name">
                            Name
                            <a href="#" v-tooltip.right="'The name of your theme'">[?]</a>
                        </label>
                        <input autofocus type="text" id="theme_name" class="form-control form-control-sm" name="theme_name" v-model="themeName">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="preset">
                            Preset
                            <a href="#" v-tooltip.right="'A layout preset to help you customize the theme'">[?]</a>
                        </label>
                        <select name="preset" id="preset" class="form-control form-control-sm" v-model="selectedPreset">
                            <option v-for="preset in presets" :value="preset.name">{{ preset.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="view">
                            View
                            <a href="#" v-tooltip.right="'Select a view to see how your theme looks in differents parts of Keypirinha'">[?]</a>
                        </label>
                        <select name="view" id="view" class="form-control form-control-sm" v-model="currentView">
                            <option v-for="view in views" :value="view.id">{{ view.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="baseTheme">
                            Base theme
                            <a href="#" v-tooltip.right="'Choose one of the themes below so you can use it as a base to your own theme. The current theme will be reseted.'">[?]</a>
                        </label>
                        <select name="baseTheme" @change="importFromSelect" id="baseTheme" class="form-control form-control-sm" v-model="baseTheme">
                            <option value=""></option>
                            <option v-for="theme in themes" :value="theme">{{ theme }}</option>
                        </select>
                        <small v-if="loadingBaseTheme" class="form-text text-muted">Loading theme...</small>
                    </div>
                </div>
                <div class="col">
                    <label for="theme_name">&nbsp;</label>
                    <div class="form-group">
                        <button type="button" @click="downloadTheme" class="btn btn-primary btn-sm">Download theme</button>
                        <button @click="showImportModal" type="button" class="btn btn-secondary btn-sm">Import theme</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="opacity_back">
                            Opacity
                            <a href="#" v-tooltip.right="'Value must be an integer in range [20, 100], with 20 being very transparent (barely usable) and 100 being fully opaque. Incorrect values will be forced to default.'">[?]</a>
                        </label>
                        <input type="number" min="20" max="100" id="opacity_back" class="form-control form-control-sm" name="opacity_back" v-model="theme.opacity_back">
                        <small class="form-text text-muted">Range: [20,100]</small>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="control_margin">
                            Control Margin
                            <a href="#" v-tooltip.right="'The distance between each element of the GUI (in pixels)'">[?]</a>
                        </label>
                        <input type="number" min="2" max="50" id="control_margin" class="form-control form-control-sm" name="control_margin" v-model="theme.control_margin">
                        <small class="form-text text-muted">Range: [2, 50]</small>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="textbox_padding">
                            Textbox padding
                            <a href="#" v-tooltip.right="'The distance between the border of a text box (edit control) and its text'">[?]</a>
                        </label>
                        <input type="number" min="1" max="50" id="textbox_padding" class="form-control form-control-sm" name="textbox_padding" v-model="theme.textbox_padding">
                        <small class="form-text text-muted">Range: [1, 50]</small>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="satellite_size">
                            Satellite size
                            <a href="#" v-tooltip.right="'Size of the satellite icon'">[?]</a>
                        </label>
                        <select name="satellite_size" class="form-control form-control-sm" id="satellite_size" v-model="theme.satellite_size">
                            <option value="small">small</option>
                            <option value="large">large</option>
                            <option value="jumbo">jumbo</option>
                            <option value="superjumbo">superjumbo</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="satellite_show">
                            Satellite show
                            <a href="#" v-tooltip.right="'When to show the contextual icon'">[?]</a>
                        </label>
                        <select name="satellite_show" id="satellite_show" class="form-control form-control-sm" v-model="theme.satellite_show">
                            <option value="always">always</option>
                            <option value="never">never</option>
                            <option value="select">select</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="satellite_pos">
                            Satellite pos.
                            <a href="#" v-tooltip.right="'Position of the satellite icon'">[?]</a>
                        </label>
                        <select name="satellite_pos" id="satellite_pos" class="form-control form-control-sm" v-model="theme.satellite_pos" :disabled="theme.satellite_show === 'never'">
                            <option value="topleft">topleft</option>
                            <option value="topcenter">topcenter</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_background">
                            Background color
                            <a href="#" v-tooltip.right="'The background color used in keypirinha\'s container'">[?]</a>
                        </label>
                        <color-picker v-model="theme.color_background"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_foreground">
                            Foreground color
                            <a href="#" v-tooltip.right="'The font color used in keypirinha'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_foreground'" :color="theme.color_foreground" v-model="theme.color_foreground"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_textbox_back">
                            Textbox background
                            <a href="#" v-tooltip.right="'Background color used in the text control'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_textbox_back'" :color="theme.color_textbox_back" v-model="theme.color_textbox_back"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_status">
                            Color status
                            <a href="#" v-tooltip.right="'Color of the text in the status bar'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_status'" :color="theme.color_status" v-model="theme.color_status"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_accent">
                            Color Accent
                            <a href="#" v-tooltip.right="'Background color used in the selelection mark when an item is selected'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_accent'" :color="theme.color_accent" v-model="theme.color_accent"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_warn">
                            Color warn
                            <a href="#" v-tooltip.right="'Applied to so-called ERROR items, which are special items sent by the plugins used to display any kind of warning/error message.'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_warn'" :color="theme.color_warn" v-model="theme.color_warn"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_large_size">
                            Font size (large)
                            <a href="#" v-tooltip.right="'Used for the title and the text control'">[?]</a>
                        </label>
                        <input type="number" min="1" id="font_large_size" class="form-control form-control-sm" name="font_large_size" v-model="theme.font_large_size">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_large_style">
                            Font style (large)
                            <a href="#" v-tooltip.right="'Used for the title and the text control'">[?]</a>
                        </label>
                        <select name="font_large_style" id="font_large_style" class="form-control form-control-sm" v-model="theme.font_large_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_title">
                            Color title
                            <a href="#" v-tooltip.right="'Color of the text located at the left side of the text box that is only displayed once an item has been selected with the Tab key.'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_title'" :color="theme.color_title" v-model="theme.color_title"/>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Layout</legend>
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_scrollbar" value="list_scrollbar" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_scrollbar">
                            List Scrollbar
                            <a href="#" v-tooltip.right="'The vertical scroll bar of the result list'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_icon" value="list_icon" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_icon">
                            List icons
                            <a href="#" v-tooltip.right="'The icons in the results list'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_dialnum" value="list_dialnum" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_dialnum">
                            List dial nums
                            <a href="#" v-tooltip.right="'Display the dial number at the right side of the result item. Recommended if you plan to launch your item with the Ctrl+Numpad1... or Ctrl+1... shortcuts.'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_selmark" value="list_selmark" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_selmark">
                            List selection mark
                            <a href="#" v-tooltip.right="'The selection mark shown at the left side of an item in the results list.'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_hits" value="list_hits" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_hits">
                            List hits
                            <a href="#" v-tooltip.right="'The number of hits for items that were already executed, prefixed by + (formerly the show_history_hits setting)'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_list_actions" value="list_actions" v-model="theme.layout">
                        <label class="form-check-label" for="layout_list_actions">
                            List actions
                            <a href="#" v-tooltip.right="'In the list, the number of available actions (if any) is displayed when an item is selected'">[?]</a>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="layout[]" id="layout_status" value="status" v-model="theme.layout">
                        <label class="form-check-label" for="layout_status">
                            Status
                            <a href="#" v-tooltip.right="'The status bar at the bottom'">[?]</a>
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Results</legend>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="listitem_padding">
                            Item padding
                            <a href="#" v-tooltip.right="'The distance between the top and bottom borders of a result item and its content'">[?]</a>
                        </label>
                        <input type="number" min="1" max="50" id="listitem_padding" class="form-control form-control-sm" name="listitem_padding" v-model="theme.listitem_padding">
                        <small class="form-text text-muted">Range: [1,50]</small>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_back">
                            Background color
                            <a href="#" v-tooltip.right="'Background color used for each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_back'" :color="theme.color_listitem_back" v-model="theme.color_listitem_back"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_title">
                            Title color
                            <a href="#" v-tooltip.right="'The color used in the title of each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_title'" :color="theme.color_listitem_title" v-model="theme.color_listitem_title"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_desc">
                            Description color
                            <a href="#" v-tooltip.right="'The color used in the description of each item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_desc'" :color="theme.color_listitem_desc" v-model="theme.color_listitem_desc"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_tips">
                            Tips color
                        </label>
                        <ColorPicker :inputid="'color_listitem_tips'" :color="theme.color_listitem_tips" v-model="theme.color_listitem_tips"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="compact_results">
                            Compact results
                            <a href="#" v-tooltip.right="'This option allows to visually compact the results so only one line is required per result (small icon)'">[?]</a>
                        </label>
                        <select name="compact_results" id="compact_results" v-model="theme.compact_results" class="form-control form-control-sm">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="listitem_title_font">
                            Title font
                            <a href="#" v-tooltip.right="'The font to use for the title of an item in the results list'">[?]</a>
                        </label>
                        <select name="listitem_title_font" id="listitem_title_font" class="form-control form-control-sm" v-model="theme.listitem_title_font">
                            <option value="small">small</option>
                            <option value="snormal">snormal</option>
                            <option value="normal">normal</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_normal_size">
                            Font size (normal)
                            <a href="#" v-tooltip.right="'Used for the title and the text control only when the title is lengthy'">[?]</a>
                        </label>
                        <input type="number" min="1" id="font_normal_size" class="form-control form-control-sm" name="font_normal_size" v-model="theme.font_normal_size">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_normal_style">
                            Font style (normal)
                            <a href="#" v-tooltip.right="'Used for the title and the text control only when the title is lengthy'">[?]</a>
                        </label>
                        <select name="font_normal_style" id="font_normal_style" class="form-control form-control-sm" v-model="theme.font_normal_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_snormal_size">
                            Font size (snormal)
                            <a href="#" v-tooltip.right="'Used for the title part of the list item by default'">[?]</a>
                        </label>
                        <input type="number" min="1" id="font_snormal_size" class="form-control form-control-sm" name="font_snormal_size" v-model="theme.font_snormal_size">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_snormal_style">
                            Font style (snormal)
                            <a href="#" v-tooltip.right="'Used for the title part of the list item by default'">[?]</a>
                        </label>
                        <select name="font_snormal_style" id="font_snormal_style" class="form-control form-control-sm" v-model="theme.font_snormal_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_small_size">
                            Font size (small)
                            <a href="#" v-tooltip.right="'Used for list items and status bar'">[?]</a>
                        </label>
                        <input type="number" min="1" id="font_small_size" class="form-control form-control-sm" name="font_small_size" v-model="theme.font_small_size">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="font_small_style">
                            Font style (small)
                            <a href="#" v-tooltip.right="'Used for list items and status bar'">[?]</a>
                        </label>
                        <select name="font_small_style" id="font_small_style" class="form-control form-control-sm" v-model="theme.font_small_style">
                            <option value="bold">bold</option>
                            <option value="cleartype">cleartype</option>
                        </select>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Results - Selected</legend>
            <div class="row">
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_selected_back">
                            Background color
                            <a href="#" v-tooltip.right="'Background color used for each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_selected_back'" :color="theme.color_listitem_selected_back" v-model="theme.color_listitem_selected_back"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_selected_title">
                            Title color
                            <a href="#" v-tooltip.right="'The color used in the title of each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_selected_title'" :color="theme.color_listitem_selected_title" v-model="theme.color_listitem_selected_title"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_selected_desc">
                            Description color
                            <a href="#" v-tooltip.right="'The color used in the description of each selected item in the results list'">[?]</a>
                        </label>
                        <ColorPicker :inputid="'color_listitem_selected_desc'" :color="theme.color_listitem_selected_desc" v-model="theme.color_listitem_selected_desc"/>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <label for="color_listitem_selected_tips">
                            Tips color
                        </label>
                        <ColorPicker :inputid="'color_listitem_selected_tips'" :color="theme.color_listitem_selected_tips" v-model="theme.color_listitem_selected_tips"/>
                    </div>
                </div>
            </div>
        </fieldset>

        <!--Import modal-->
        <modal v-show="isModalImportVisible" @close="closeImportModal">
            <h5 slot="header">Import theme</h5>
            <div slot="body">
                <form action="#">
                    <textarea placeholder="Paste your theme here..." name="theme" v-model="themeImportText" id="theme" class="form-control" cols="30" rows="10"></textarea>
                </form>
            </div>
            <div slot="footer">
                <button type="button" @click="importFromModal" class="btn btn-primary" :disabled="!themeImportText">Import</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import Modal from './Modal.vue'
    import ColorPicker from './ColorPicker.vue'

    export default {
        components: {ColorPicker, Modal},
        name: 'Config',
        data() {
            return {
                baseTheme: null,
                themeImportText: null,
                selectedPreset: 'JumboLayout',
                isModalImportVisible: false,
                loadingBaseTheme: false,
            };
        },
        watch: {
            selectedPreset(newValue) {
                if (newValue) {
                    const preset = this.presets.filter(item => item.name === newValue)[0];
                    this.bulkUpdateTheme(preset.theme);
                }
            },
            selectedTheme(theme) {
                this.baseTheme = theme
            }
        },
        methods: {
            showImportModal() {
                this.isModalImportVisible = true;
            },
            closeImportModal() {
                this.isModalImportVisible = false;
            },
            importFromModal() {
                this.importFromUser(this.themeImportText)
                this.closeImportModal();
            },
            importFromSelect() {
                if (this.baseTheme) {
                    this.importThemeFromFile(this.baseTheme);
                    this.closeImportModal();
                } else {
                    this.resetTheme();
                }
            },
            downloadTheme() {
                let theme = `[theme/${this.themeName}]\r\n`;
                for (let key of Object.keys(this.theme)) {
                    theme += `${key} = ${this.theme[key]}\r\n`
                }

                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(theme));
                element.setAttribute('download', `${this.themeName.toLowerCase()}.txt`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            },
            ...mapActions(['importThemeFromFile', 'importFromUser']),
            ...mapMutations(['bulkUpdateTheme', 'setCurrentView', 'resetTheme'])
        },
        computed: {
            ...mapGetters([
                'theme',
                'themes',
                'presets',
                'views'
            ]),
            selectedTheme: {
                get() {
                    return this.$store.state.selectedTheme;
                }
            },
            themeName: {
                get() {
                    return this.$store.state.themeName;
                },
                set(value) {
                    this.$store.commit('setThemeName', value);
                }
            },
            currentView: {
                get() {
                    return this.$store.state.currentView;
                },
                set(value) {
                    this.$store.commit('setCurrentView', value);
                }
            }
        }
    }
</script>
