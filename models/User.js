import Model from './Model'

export default class User extends Model {
  resource () {
    return 'user/detail'
  }
  primaryKey () {
    return 'username'
  }
  patchData (params) {
    return this.request({
      method: 'PATCH',
      url: this.endpoint(),
      data: params
    }).then(response => response)
  }
}
