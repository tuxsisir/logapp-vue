import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // define a base url for a REST API
  baseURL () {
    return `${process.env.PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/api`
  }

  // implement a default request method
  request (config) {
    config.url += '/'
    // if (config.method !== 'GET') config.url += '/'
    return this.$http.request(config)
  }
}
