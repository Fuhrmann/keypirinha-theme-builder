import Vue from 'vue';
import Keypirinha from './Keypirinha.vue'
import {store} from './store';
import {VTooltip} from 'v-tooltip'

import './style/app.scss';
import 'bootstrap/scss/bootstrap.scss'

Vue.directive('tooltip', VTooltip);

new Vue({
    store,
    el: '#theme-builder',
    components: {
        Keypirinha,
    }
});
