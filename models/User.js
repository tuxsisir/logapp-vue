import Model from './Model'

export default class User extends Model {
  resource () {
    return 'user/detail'
  }
  primaryKey () {
    return 'username'
  }
}
