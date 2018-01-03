import { remote } from 'electron';

export default function install (Vue) {
    Vue.prototype.$remote = remote.require('./main.js').remote;
}