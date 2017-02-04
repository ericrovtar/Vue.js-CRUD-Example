var vueSmoothScroll = require('vue-smoothscroll');
module.exports = {
    install: function(Vue, options) {
        Object.defineProperty(Vue.prototype, '$ScrollToTop', {
            get: function() {
                let top = document.getElementById("app");
                this.$SmoothScroll(top);
            }
        })
    }
}