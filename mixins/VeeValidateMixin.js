/*
Currently this validation snippet handles the validation for two nested level
of errors. If anything comes further than two nested validation,
it is highly recommended to adjust the api accordingly.

Further changes are encouraged here.
TODO: @sisir implement localization here.
 */

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      nonFieldErrors: [],
      notify: {}
    }
  },
  methods: {
    collectErrors (fieldName) {
      return this.errors.collect(fieldName)
    },
    validateAllFields () {
      this.$validator.validateAll()
    },
    notifyUser (msg, color) {
      this.notify = {
        text: msg,
        color: color,
        display: true
      }
    },
    notifyInvalidFormResponse () {
      this.notify = {
        text: 'Please review all the fields and try submitting the form again.',
        color: 'red',
        display: true
      }
    },
    pushErrors (error) {
      this.$validator.errors.clear()
      let errorResponse = JSON.parse(error.response.request.response)
      for (let errorField in errorResponse) {
        if (parseInt(Object.keys(errorResponse[errorField])[0]) === 0) {
          // if
          if (this.$validator.fields.find({ 'name': errorField })) {
            this.addFieldValidation(errorField, errorResponse[errorField][0])
          } else {
            this.addNonFieldValidation(errorField, errorResponse[errorField][0])
          }
        } else {
          for (let errorFieldInner in errorResponse[errorField]) {
            if (this.$validator.fields.find({ 'name': errorFieldInner })) {
              this.addFieldValidation(errorFieldInner,
                errorResponse[errorField][errorFieldInner][0])
            } else {
              this.addNonFieldValidation(errorFieldInner,
                errorResponse[errorField][errorFieldInner][0])
            }
          }
        }
      }
    },
    addFieldValidation (field, msg) {
      this.$validator.errors.add({
        field: field,
        msg: msg
      })
    },
    addNonFieldValidation (field, msg) {
      let errorObj = {}
      errorObj[field.split('_').join(' ')] = msg
      this.nonFieldErrors.push(errorObj)
    },
    veeValidate (fieldName, properFieldName) {
      return {
        'id': 'id' + fieldName,
        'label': properFieldName,
        'data-vv-as': properFieldName,
        'data-vv-name': fieldName,
        'data-vv-validate-on': 'change',
        'errors': this.collectErrors(fieldName),
        'error-messages': this.collectErrors(fieldName)
      }
    }
  }
}
