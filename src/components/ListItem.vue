<template>
    <div class="list-item" :style="listItemStyle">
        <ul>
            <li v-for="(item, index) in items" :style="isSelected(index) ? listItemSelectedResultStyle : listItemResultStyle" :class="isSelected(index) ? 'selected' : ''">
                <div class="icon" v-show="theme.layout.indexOf('list_icon') > -1 && currentView !== 'actions'" :style="listItemIconStyle">
                    <img src="src/images/logo.png">
                </div>
                <div class="label">
                    <span class="name" :style="isSelected(index) ? listItemSelectedTitleStyle : listItemTitleStyle">
                        {{ item.name }}
                        <span :style="isSelected(index) ? listItemSelectedDescStyle : listItemDescStyle" v-show="theme.compact_results === 'yes'">- {{ item.description }}</span>
                    </span>
                    <span class="description" :style="isSelected(index) ? listItemSelectedDescStyle : listItemDescStyle" v-show="theme.compact_results === 'no'">
                        {{ item.description }}
                    </span>
                </div>
                <div class="helper" v-show="theme.layout.indexOf('list_dialnum') > -1" :style="isSelected(index) ? listItemSelectedHelperStyle : listItemHelperStyle">
                    <div class="position">
                        <span v-show="item.actions && theme.compact_results === 'yes' && isSelected(index)">> {{ item.actions }}</span>
                        #{{ index + 1}}
                    </div>
                    <div class="action-count" v-if="isSelected(index) && showActionCount(item)">
                        <span>{{ actionText(item, index) }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'ListItem',
        data() {
            return {
                selected: 0,
                items: [],
            }
        },
        mounted() {
            this.items = this.results;
        },
        methods: {
            isSelected(index) {
                return index === this.selected
            },
            actionText(item, index) {
                if (this.theme.layout.indexOf('list_hits') > -1 && this.isSelected(index)) {
                    if (this.theme.layout.indexOf('list_actions') > -1) {
                        return `${item.actions} actions`;
                    }

                    return `+${item.hits}`;
                }

                if (this.theme.layout.indexOf('list_hits') > -1) {
                    return `+${item.hits}`;
                }

                if (this.theme.layout.indexOf('list_actions') > -1) {
                    return `${item.actions} actions`;
                }

                return ''
            },
            showActionCount(item) {
                return (this.theme.layout.indexOf('list_actions') > -1 || this.theme.layout.indexOf('list_hits') > -1) && this.theme.compact_results === 'no' && item.actions;
            },
        },
        watch: {
            currentView(newValue) {
                switch (newValue) {
                    case 'error':
                        this.items = [{name: "Error", description: "File/dir not found"}];
                        break;
                    case 'results':
                        this.items = this.results;
                        break;
                    case 'actions':
                        this.items = this.actions;
                        break;
                    default:
                        this.items = this.results;
                }
            }
        },
        computed: {
            ...mapGetters([
                'theme',
                'results',
                'actions',
                'currentView',
                'listItemStyle',
                'listItemResultStyle',
                'listItemIconStyle',
                'listItemSelectedResultStyle',
                'listItemTitleStyle',
                'listItemSelectedTitleStyle',
                'listItemDescStyle',
                'listItemSelectedDescStyle',
                'listItemHelperStyle',
                'listItemSelectedHelperStyle',
            ])
        }
    }
</script>
