import Vue from 'vue';
import Main from './Main.vue';

import BaseInput from '@components/BaseInput/';
import BaseCheckBox from '@components/BaseCheckBox/';

Vue.component('BaseInput', BaseInput);
Vue.component('BaseCheckBox', BaseCheckBox);

new Vue({
    render: (createEl) => createEl(Main)
}).$mount('#app');