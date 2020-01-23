import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = {
    results: [
        {
            name: "Keypirinha: Configure",
            description: "Edit Keypirinha's configuration file(s)",
            actions: 2,
            hits: 50
        },
        {name: "Keypirinha: About", description: "About Keypirinha...", actions: 1, hits: 120},
        {name: "Keypirinha: Exit", description: "Exit Keypirinha", actions: 1, hits: 35},
    ],
    actions: [
        {name: 'Open', description: 'Open file/application'},
        {name: 'Explore', description: 'Show in file explorer'},
        {name: 'Properties', description: 'Display file\'s properties'},
    ],
    satelliteSizes: [
        {name: 'small', size: '32'},
        {name: 'large', size: '64'},
        {name: 'jumbo', size: '128'},
        {name: 'superjumbo', size: '256'},
    ],
    presets: [
        {
            name: 'TinyLayout',
            theme: {
                font_small_size: 10,
                font_snormal_size: 10,
                font_normal_size: 10,
                font_large_size: 10,
                layout: ['list_icon', 'list_dialnum', 'list_selmark', 'list_actions'],
                compact_results: 'yes',
                satellite_show: 'never',
                control_margin: 2,
                textbox_padding: 1,
                listitem_padding: 1,
                listitem_title_font: 'snormal'
            }
        },
        {
            name: 'MiniLayout',
            theme: {
                font_small_size: 10,
                font_snormal_size: 10,
                font_normal_size: 12,
                font_large_size: 18,
                layout: ['list_icon', 'list_dialnum', 'list_selmark', 'list_actions'],
                compact_results: 'yes',
                satellite_show: 'select',
                satellite_pos: 'topleft',
                satellite_size: 'small',
                control_margin: 3,
                textbox_padding: 1,
                listitem_padding: 1,
                listitem_title_font: 'snormal'
            }
        },
        {
            name: 'MediumLayout',
            theme: {
                font_small_size: 10,
                font_snormal_size: 10,
                font_normal_size: 12,
                font_large_size: 18,
                layout: ['list_icon', 'list_dialnum', 'list_selmark', 'list_actions'],
                satellite_show: 'always',
                satellite_pos: 'topleft',
                satellite_size: 'small',
                control_margin: 4,
                textbox_padding: 3,
                listitem_padding: 1,
                compact_results: 'no',
                listitem_title_font: 'snormal'
            }
        },
        {
            name: 'JumboLayout',
            theme: {
                font_small_size: 9,
                font_snormal_size: 14,
                font_normal_size: 14,
                font_large_size: 28,
                layout: ['list_selmark', 'list_icon', 'list_dialnum', 'list_actions'],
                compact_results: 'no',
                satellite_show: 'always',
                satellite_pos: 'topcenter',
                satellite_size: 'jumbo',
                control_margin: 6,
                textbox_padding: 4,
                listitem_padding: 2,
                listitem_title_font: 'snormal'
            }
        },
    ],
    themeName: 'CustomTheme',
    views: [
        {id: 'results', name: "Results view"},
        {id: 'error', name: "Error view"},
        {id: 'actions', name: "Actions view"}
    ],
    currentView: 'results',
    preset: 'JumboLayout',
    themes: [],
    selectedTheme: null,
    theme: {
        opacity_back: 97,
        satellite_show: 'always',
        satellite_pos: 'topcenter',
        satellite_size: 'jumbo',
        control_margin: 6,
        textbox_padding: 4,
        listitem_padding: 4,
        layout: ['list_selmark', 'list_icon', 'list_dialnum', 'list_actions'],
        color_background: '#484848',
        color_foreground: '#f2f2f2',
        color_title: '#f2f2f2',
        color_textbox_back: '#303030',
        color_faded: '#a2a2a2',
        color_status: '#a2a2a2',
        color_accent: '#a6e5ff',
        color_warn: '#eb6420',
        color_listitem_back: '#383838',
        color_listitem_title: '#f2f2f2',
        color_listitem_desc: '#a2a2a2',
        color_listitem_tips: '#a2a2a2',
        color_listitem_selected_back: '#2f2f2f',
        color_listitem_selected_title: '#a6e5ff',
        color_listitem_selected_desc: '#f2f2f2',
        color_listitem_selected_tips: '#a6e5ff',
        font_large_size: 28,
        font_large_style: 'bold',
        font_snormal_size: 10,
        font_snormal_style: 'cleartype',
        font_normal_size: 10,
        font_normal_style: 'cleartype',
        font_small_size: 10,
        font_small_style: 'cleartype',
        font_face: 'Tahoma, Arial, Segoe UI',
        compact_results: 'no',
        listitem_title_font: 'snormal',
    }
};

function parseTheme(themeData) {
    const lines = themeData.split('\n');

    let newTheme = [];
    let name = '';
    for (let line of lines) {
        // Theme name, if present
        // [theme/ThemeName]
        if (line.indexOf('[theme/') > -1) {
            name = line.match(/\[([\w\d]+)\/([\w\d]+)\]/i);
            if (typeof name[2] !== 'undefined') {
                name = name[2];
            }
        }

        if (line.indexOf('=') > -1) {
            const matches = line.split('=');

            const configuration = matches[0].trim();
            let value = matches[1].trim();
            if (value.indexOf(',') > -1) {
                value = value.split(',').map(item => item.trim());
            }

            newTheme[configuration] = value;
        }
    }

    return {themeData: newTheme, name};
}

export const store = new Vuex.Store({
    state: {...initialState},
    getters: {
        /**
         * The currently applied theme.
         */
        theme(state) {
            return state.theme;
        },
        /**
         * All the available themes
         */
        themes(state) {
            return state.themes;
        },
        /**
         * List of presets.
         */
        presets(state) {
            return state.presets;
        },
        /**
         * The results used in the results view.
         */
        results(state) {
            return state.results;
        },
        /**
         * The actions used in the actions view.
         */
        actions(state) {
            return state.actions;
        },
        /**
         * All the possible views the user can choose.
         */
        views(state) {
            return state.views;
        },
        /**
         * The current view selected by the user.
         */
        currentView(state) {
            return state.currentView;
        },
        /**
         * The current preset selected by the user.
         */
        preset(state) {
            return state.preset;
        },
        /**
         * The style used in the box above keypirinha's search box
         */
        satelliteAnchorStyle(state) {
            const satelliteData = state.satelliteSizes.filter(item => item.name === state.theme.satellite_size)[0];
            const middle = (satelliteData.size / 2);

            if (state.theme.satellite_pos !== 'topleft') {
                return {
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    marginLeft: `-${middle}px`,
                    marginTop: `-${middle + middle + 10 + parseInt(state.theme.control_margin)}px`
                };
            }

            let bottom = 0;
            let marginBottom = 0;

            if (((parseInt(state.theme.textbox_padding) * 2) + 60) > parseInt(satelliteData.size) + 4) {
                bottom = '50%';
                marginBottom = `-${middle}px`
            }

            return {
                right: '100.5%',
                position: 'absolute',
                bottom,
                marginBottom
            }
        },
        /**
         * The style used in the icon above keypirinha's search box
         */
        satelliteIconStyle(state) {
            const satelliteData = state.satelliteSizes.filter(item => item.name === state.theme.satellite_size)[0];

            let display = 'none';
            if ((state.theme.satellite_pos !== 'topleft' && state.theme.satellite_show === 'select') || state.theme.satellite_show === 'always') {
                display = 'block';
            }

            return {
                backgroundColor: '#303030',
                borderRadius: `${(satelliteData.size / 12)}px`,
                width: `${satelliteData.size}px`,
                height: `${satelliteData.size}px`,
                display: display,
                margin: state.theme.satellite_pos === 'topcenter' ? '0 auto' : 'none',
                position: 'relative',
            }
        },
        /**
         * The style used in keypirinha's container.
         */
        keypirinhaStyle(state) {

            const satellite = state.theme.satellite_show;

            let marginTop = 0;
            switch (state.theme.satellite_size) {
                case 'small':
                    marginTop = 55;
                    break;
                case 'large':
                    marginTop = 85;
                    break;
                case 'jumbo':
                    marginTop = 155;
                    break;
                case 'superjumbo':
                    marginTop = 285;
                    break;
                default:
                    marginTop = 0
            }

            if (satellite == 'never') {
                marginTop = 15
            }

            return {
                marginTop: `${marginTop}px`,
                opacity: state.theme.opacity_back / 100,
            }
        },
        /**
         * The style used in the search box.
         */
        searchBoxStyle(state) {
            return {
                fontFamily: 'Tahoma',
                fontWeight: state.theme.font_large_style === 'bold' ? 'bold' : 100,
                fontSize: `${(parseInt(state.theme.font_large_size) + 5)}px`,
                borderColor: state.theme.color_background,
                color: state.currentView === 'actions' ? state.theme.color_title : state.theme.color_foreground,
                backgroundColor: state.currentView === 'actions' ? state.theme.color_background : state.theme.color_textbox_back,
                borderRightWidth: `${state.theme.control_margin}px`,
                borderTopWidth: `${state.theme.control_margin}px`,
                borderBottomWidth: `${state.theme.control_margin}px`,
                borderLeftWidth: state.theme.satellite_pos === 'topleft' && state.theme.satellite_show === 'always' ? '45px' : `${state.theme.control_margin}px`,
                padding: `${state.theme.textbox_padding}px`,
            }
        },
        /**
         * The style used for the results container.
         */
        listItemStyle(state) {
            return {
                borderColor: state.theme.color_background,
                backgroundColor: state.theme.color_textbox_back,
                borderTopWidth: '0.1px',
                borderRightWidth: `${state.theme.control_margin}px`,
                borderBottomWidth: `${state.theme.control_margin}px`,
                borderLeftWidth: `${state.theme.control_margin}px`,
            }
        },
        /**
         * The style used for each result in the result list.
         */
        listItemResultStyle(state) {
            let fontSize = state.theme.font_small_size;
            let fontStyle = state.theme.font_small_style;

            switch (state.theme.listitem_title_font) {
                case 'small':
                    fontSize = state.theme.font_small_size;
                    fontStyle = state.theme.font_small_style;
                    break;
                case 'snormal':
                    fontSize = state.theme.font_snormal_size;
                    fontStyle = state.theme.font_snormal_style;
                    break;
                case 'normal':
                    fontSize = state.theme.font_normal_size;
                    fontStyle = state.theme.font_normal_style;
                    break;
                case 'large':
                    fontSize = state.theme.font_large_size;
                    fontStyle = state.theme.font_large_style;
                    break;
            }

            // Compact results always use the font small size
            if (state.theme.compact_results == 'yes') {
                fontSize = state.theme.font_small_size;
                fontStyle = state.theme.font_small_style;
            }

            fontSize = parseInt(fontSize) + 4

            return {
                fontWeight: fontStyle === 'bold' ? 'bold' : 100,
                paddingLeft: state.theme.layout.indexOf('list_selmark') > -1 ? '5px' : '3px',
                paddingTop: `${state.theme.listitem_padding}px`,
                paddingBottom: `${state.theme.listitem_padding}px`,
                fontSize: `${fontSize}px`,
                fontFamily: 'Tahoma',
                backgroundColor: state.theme.color_listitem_back,
                minHeight: state.theme.compact_results === 'yes' ? '25px' : '44px',
            }
        },
        /**
         * The style used for each icon in the result list.
         */
        listItemIconStyle(state) {
            return {
                width: state.theme.compact_results === 'yes' ? '18px' : '32px',
                height: state.theme.compact_results === 'yes' ? '18px' : '32px',
            }
        },
        /**
         * The style used for each selected result in the result list.
         */
        listItemSelectedResultStyle(state, getters) {
            const selMarkColor = state.currentView === 'error' ? state.theme.color_warn : state.theme.color_accent;

            return {
                ...getters.listItemResultStyle,
                paddingLeft: '3px',
                borderLeft: state.theme.layout.indexOf('list_selmark') > -1 ? `2px solid ${selMarkColor}` : 'none',
                backgroundColor: state.theme.color_listitem_selected_back,
            }
        },
        /**
         * The style used for each title in the result list.
         */
        listItemTitleStyle(state) {
            return {
                color: state.theme.color_listitem_title
            }
        },
        /**
         * The style used for each selected title in the result list.
         */
        listItemSelectedTitleStyle(state) {
            return {
                color: state.currentView === 'error' ? state.theme.color_warn : state.theme.color_listitem_selected_title
            }
        },
        /**
         * The sttyle used for each description in the result list.
         */
        listItemDescStyle(state) {
            return {
                fontSize: `${(parseInt(state.theme.font_small_size) + 4)}px`,
                fontWeight: state.theme.font_small_style === 'bold' ? 'bold' : 100,
                color: state.theme.color_listitem_desc
            }
        },
        /**
         * The sttyle used for each selected description in the result list.
         */
        listItemSelectedDescStyle(state) {
            return {
                fontSize: `${(parseInt(state.theme.font_small_size) + 4)}px`,
                fontWeight: state.theme.font_small_style === 'bold' ? 'bold' : 100,
                color: state.currentView === 'error' ? state.theme.color_warn : state.theme.color_listitem_selected_desc
            }
        },
        /**
         * The style used in the status bar container.
         */
        statusBarStyle(state) {
            return {
                backgroundColor: state.theme.color_background,
                fontSize: `${parseInt(state.theme.font_small_size) + 4}px`,
                color: state.theme.color_status,
                paddingRight: `${state.theme.control_margin}px`,
                paddingBottom: `${state.theme.control_margin}px`,
            }
        },
        /**
         * The sttyle used for each dial num in the result list.
         */
        listItemHelperStyle(state) {
            return {
                fontSize: `${(parseInt(state.theme.font_small_size) + 4)}px`,
                fontWeight: state.theme.font_small_style === 'bold' ? 'bold' : 100,
                color: state.theme.color_listitem_tips,
            }
        },
        /**
         * The sttyle used for each selected dial num in the result list.
         */
        listItemSelectedHelperStyle(state) {
            return {
                fontSize: `${(parseInt(state.theme.font_small_size) + 4)}px`,
                fontWeight: state.theme.font_small_style === 'bold' ? 'bold' : 100,
                color: state.theme.color_listitem_selected_tips,
            }
        }
    },
    actions: {
        /**
         * Import a theme from the theme files.
         *
         * @param store
         * @param newTheme
         */
        importThemeFromFile(store, newThemeName) {
            fetch(`themes/available/${newThemeName}.txt`).then((stream) => {
                return stream.text()
            }).then((data) => {
                const newTheme = parseTheme(data)

                store.commit('resetTheme');
                store.commit('setThemeName', newThemeName);
                store.commit('setSelectedTheme', newTheme.name);
                store.commit('bulkUpdateTheme', newTheme.themeData);
            })
        },
        /**
         * Import a theme from the modal.
         *
         * @param store
         * @param themeData
         */
        importFromUser(store, themeData) {
            const newTheme = parseTheme(themeData)

            if (typeof newTheme.name !== 'undefined') {
                store.commit('setThemeName', newTheme.name);
            }

            store.commit('resetTheme');
            store.commit('bulkUpdateTheme', newTheme.themeData);
        }
    },
    mutations: {
        /**
         * Bulk update the theme.
         */
        bulkUpdateTheme(state, theme) {
            state.theme = {
                ...state.theme,
                ...theme
            }
        },

        /**
         * Update the current view.
         */
        setCurrentView(state, view) {
            state.currentView = view;
        },

        /**
         * Update the theme name.
         */
        setThemeName(state, name) {
            state.themeName = name;
        },

        /**
         * Update the preset.
         */
        setPreset(state, name) {
            state.preset = name;

            const presetData = state.presets.filter(item => item.name === state.preset)[0];
            store.commit('bulkUpdateTheme', presetData.theme);
        },

        /**
         * Update the selected (from file) theme name.
         */
        setSelectedTheme(state, name) {
            state.selectedTheme = name;
        },

        /**
         * Reset the theme to its initial state.
         */
        resetTheme(state) {
            state.theme = initialState.theme;
            state.preset = initialState.preset;
        },

        /**
         * Set the available themes to be used as base.
         */
        setThemes(state, themes) {
            state.themes = themes;
        },
    }
});
