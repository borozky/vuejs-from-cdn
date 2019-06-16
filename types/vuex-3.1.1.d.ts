import { WatchOptions, Vue, ComponentOptions, VueConstructor } from "./vue-2.6.10";
import { VueRouter } from "./vue-router-3.0.5";

type Dictionary<T> = { [key: string]: T };
type Computed = () => any;
type MutationMethod = (...args: any[]) => void;
type ActionMethod = (...args: any[]) => Promise<any>;
type CustomVue = Vue & Dictionary<any>;

interface Mapper<R> {
    (map: string[]): Dictionary<R>;
    (map: Dictionary<string>): Dictionary<R>;
}

interface MapperWithNamespace<R> {
    (namespace: string, map: string[]): Dictionary<R>;
    (namespace: string, map: Dictionary<string>): Dictionary<R>;
}

interface FunctionMapper<F, R> {
    (map: Dictionary<(this: CustomVue, fn: F, ...args: any[]) => any>): Dictionary<R>;
}

interface FunctionMapperWithNamespace<F, R> {
    (
        namespace: string,
        map: Dictionary<(this: CustomVue, fn: F, ...args: any[]) => any>
    ): Dictionary<R>;
}

interface MapperForState {
    <S>(
        map: Dictionary<(this: CustomVue, state: S, getters: any) => any>
    ): Dictionary<Computed>;
}

interface MapperForStateWithNamespace {
    <S>(
        namespace: string,
        map: Dictionary<(this: CustomVue, state: S, getters: any) => any>
    ): Dictionary<Computed>;
}

interface NamespacedMappers {
    mapState: Mapper<Computed> & MapperForState;
    mapMutations: Mapper<MutationMethod> & FunctionMapper<Commit, MutationMethod>;
    mapGetters: Mapper<Computed>;
    mapActions: Mapper<ActionMethod> & FunctionMapper<Dispatch, ActionMethod>;
}

declare const mapState: Mapper<Computed>
    & MapperWithNamespace<Computed>
    & MapperForState
    & MapperForStateWithNamespace;

declare const mapMutations: Mapper<MutationMethod>
    & MapperWithNamespace<MutationMethod>
    & FunctionMapper<Commit, MutationMethod>
    & FunctionMapperWithNamespace<Commit, MutationMethod>;

declare const mapGetters: Mapper<Computed>
    & MapperWithNamespace<Computed>;

declare const mapActions: Mapper<ActionMethod>
    & MapperWithNamespace<ActionMethod>
    & FunctionMapper<Dispatch, ActionMethod>
    & FunctionMapperWithNamespace<Dispatch, ActionMethod>;

declare function createNamespacedHelpers(namespace: string): NamespacedMappers;


declare class Store<S> {
    constructor(options: StoreOptions<S>);

    readonly state: S;
    readonly getters: any;

    replaceState(state: S): void;

    dispatch: Dispatch;
    commit: Commit;

    subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void;
    subscribeAction<P extends ActionPayload>(fn: SubscribeActionOptions<P, S>): () => void;
    watch<T>(getter: (state: S, getters: any) => T, cb: (value: T, oldValue: T) => void, options?: WatchOptions): () => void;

    registerModule<T>(path: string, module: Module<T, S>, options?: ModuleOptions): void;
    registerModule<T>(path: string[], module: Module<T, S>, options?: ModuleOptions): void;

    unregisterModule(path: string): void;
    unregisterModule(path: string[]): void;

    hotUpdate(options: {
        actions?: ActionTree<S, S>;
        mutations?: MutationTree<S>;
        getters?: GetterTree<S, S>;
        modules?: ModuleTree<S>;
    }): void;
}

declare function install(Vue: typeof _Vue): void;

interface Dispatch {
    (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
    <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

interface Commit {
    (type: string, payload?: any, options?: CommitOptions): void;
    <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

interface ActionContext<S, R> {
    dispatch: Dispatch;
    commit: Commit;
    state: S;
    getters: any;
    rootState: R;
    rootGetters: any;
}

interface Payload {
    type: string;
}

interface MutationPayload extends Payload {
    payload: any;
}

interface ActionPayload extends Payload {
    payload: any;
}

type ActionSubscriber<P, S> = (action: P, state: S) => any;

interface ActionSubscribersObject<P, S> {
    before?: ActionSubscriber<P, S>;
    after?: ActionSubscriber<P, S>;
}

type SubscribeActionOptions<P, S> = ActionSubscriber<P, S> | ActionSubscribersObject<P, S>;

interface DispatchOptions {
    root?: boolean;
}

interface CommitOptions {
    silent?: boolean;
    root?: boolean;
}

interface StoreOptions<S> {
    state?: S | (() => S);
    getters?: GetterTree<S, S>;
    actions?: ActionTree<S, S>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<S>;
    plugins?: Plugin<S>[];
    strict?: boolean;
}

type ActionHandler<S, R> = (this: Store<R>, injectee: ActionContext<S, R>, payload?: any) => any;
interface ActionObject<S, R> {
    root?: boolean;
    handler: ActionHandler<S, R>;
}

type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
type Mutation<S> = (state: S, payload?: any) => any;
type Plugin<S> = (store: Store<S>) => any;

interface Module<S, R> {
    namespaced?: boolean;
    state?: S | (() => S);
    getters?: GetterTree<S, R>;
    actions?: ActionTree<S, R>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<R>;
}

interface ModuleOptions {
    preserveState?: boolean;
}

interface GetterTree<S, R> {
    [key: string]: Getter<S, R>;
}

interface ActionTree<S, R> {
    [key: string]: Action<S, R>;
}

interface MutationTree<S> {
    [key: string]: Mutation<S>;
}

interface ModuleTree<R> {
    [key: string]: Module<any, R>;
}

export declare const _default: {
    Store: typeof Store;
    install: typeof install;
    mapState: typeof mapState,
    mapMutations: typeof mapMutations,
    mapGetters: typeof mapGetters,
    mapActions: typeof mapActions,
    createNamespacedHelpers: typeof createNamespacedHelpers,
};

declare module "./vue-2.6.10" {
    interface ComponentOptions<V extends Vue> {
        store?: Store<any>;
    }
}

declare module "./vue-2.6.10" {
    interface Vue {
        $store: Store<any>;
    }
}

