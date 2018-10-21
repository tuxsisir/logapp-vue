import Vue from 'vue'
import VueNotify from '@/components/common/VSnackBar.vue'
import BreadCrumb from '@/components/common/BreadCrumb'

Vue.component('vue-notify', VueNotify)
Vue.component('vue-breadcrumb', BreadCrumb)

Vue.mixin({
  filters: {
    truncate: function (text, length, suffix) {
      let truncatedText = ''
      if (text.length > length) {
        truncatedText = text.substring(0, length) + suffix
      } else {
        truncatedText = text.substring(0, length)
      }
      return truncatedText
    }
  }
})
