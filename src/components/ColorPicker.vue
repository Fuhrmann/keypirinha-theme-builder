<template>
    <div class="color-picker" ref="colorpicker">
        <span class="current-color" :style="previewStyle" @click="togglePicker()">
            {{ localColor }}
        </span>
        <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker"/>
    </div>
</template>

<script>
    import {Chrome} from 'vue-color'

    // https://codepen.io/Brownsugar/pen/NaGPKy
    export default {
        name: 'ColorPicker',
        props: ['value', 'inputid'],
        components: {
            'chrome-picker': Chrome,
        },
        data() {
            return {
                colors: {
                    hex: '#000000',
                },
                displayPicker: false,
            }
        },
        mounted() {
            this.setColor(this.localColor || '#000000');
        },
        methods: {
            setColor(color) {
                this.updateColorPreview(color);
                this.localColor = color;
            },
            updateColorPreview(color) {
                if (color.slice(0, 1) === '#') {
                    this.colors = {
                        hex: color
                    };
                }
                else if (color.slice(0, 4) === 'rgba') {
                    var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
                        hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                    this.colors = {
                        hex: hex,
                        a: rgba[3],
                    }
                }
            },
            showPicker() {
                document.addEventListener('click', this.documentClick);
                this.displayPicker = true;
            },
            hidePicker() {
                document.removeEventListener('click', this.documentClick);
                this.displayPicker = false;
            },
            togglePicker() {
                this.displayPicker ? this.hidePicker() : this.showPicker();
            },
            updateFromPicker(color) {
                this.colors = color;
                if (color.rgba.a === 1) {
                    this.localColor = color.hex;
                }
                else {
                    this.localColor = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
                }
            },
            documentClick(e) {
                const el = this.$refs.colorpicker;
                const target = e.target;
                if (el !== target && !el.contains(target)) {
                    this.hidePicker();
                }
            },
            blackOrWhite(hexcolor) {
                hexcolor = (hexcolor) ? hexcolor.replace('#', '') : '';
                const r = parseInt(hexcolor.substr(0, 2), 16);
                const g = parseInt(hexcolor.substr(2, 2), 16);
                const b = parseInt(hexcolor.substr(4, 2), 16);
                const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return (yiq >= 128) ? 'black' : 'white';
            },
        },
        computed: {
            previewStyle() {
                this.updateColorPreview(this.localColor);

                return {
                    backgroundColor: this.localColor,
                    color: this.blackOrWhite(this.localColor)
                }
            },
            localColor: {
                get() {
                    return this.value;
                },
                set(newValue) {
                    this.$emit('input', newValue);
                }
            }
        }
    }
</script>
