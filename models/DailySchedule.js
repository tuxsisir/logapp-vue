import Model from './Model'

export default class BugReport extends Model {
  resource () {
    return 'user/daily-schedule'
  }
  primaryKey () {
    return 'id'
  }
}
