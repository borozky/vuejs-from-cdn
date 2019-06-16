var IndexPage = Vue.component("index-page", {
    template: "\
    <div>\
        <h4>This is about page</h4>\
        <p>Contents of the about page</p>\
    </div>\
    "
})

var SampleForm = Vue.component("sample-form", {
    template: '<div id="SampleForm">Name: <input type="text" v-model="fullName"/><br/><p>My name is {{ fullName }}</p></div>',
    data: function() {
        return {
            fullName: "",
        }
    },
})

var router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: IndexPage },
        { path: "/sample-form", component: SampleForm}
    ],
})


var app = new Vue({
    router: router,
    data: {
        rootClass: ""
    },
    mounted: function() {
        this.rootClass = "ready"
    },
}).$mount("#root")