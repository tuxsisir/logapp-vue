import Vue from 'vue'
import VeeValidate from 'vee-validate'

const config = {
  errorBagName: 'errors',
  fieldsBagName: 'formFields',
  inject: false
}
Vue.use(VeeValidate, config)
