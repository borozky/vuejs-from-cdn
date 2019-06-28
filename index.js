var IndexPage = Vue.component("index-page", {
    template: "<div>" + 
        "<h4>This is index page</h4>" +
        "<p>Contents of the index page</p>" +
    "</div>",
});

// Sample form page
var SampleFormPage = Vue.component("sample-form", {
    template: "<div id='SampleForm'>" +
        "Name: <input type='text' v-model='fullName'/><br/>" +
        "<p>My name is {{ fullName }}</p>" + 
    "</div>",
    data: function() {
        return {
            fullName: "",
        }
    },
});


// route config
var router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: IndexPage, meta: { title: "Index - Using Vue JS from CDN" } },
        { path: "/sample-form", component: SampleFormPage, meta: { title: "Sample Form - Using Vue JS from CDN" } }
    ],
});


// update document.title
router.beforeEach(function(to, from, next) {
    document.title = to.meta.title || document.title
    next();
});


// vue app
var app = new Vue({
    router: router,
    data: {
        pageTitle: "Vue application",
    }
}).$mount("#root");