import Model from './Model'

export default class BugReport extends Model {
  resource () {
    return 'bug/report'
  }
  primaryKey () {
    return 'id'
  }
}
