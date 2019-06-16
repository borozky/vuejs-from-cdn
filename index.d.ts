import { _default } from "./types/vuex-3.1.1";
import { VueConstructor } from "./types/vue-2.6.10";
import { VueRouter as _VueRouter } from "./types/vue-router-3.0.5";

declare global {
    const Vuex: typeof _default
    const Vue: VueConstructor
    const VueRouter: typeof _VueRouter
}
