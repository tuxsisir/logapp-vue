import Model from '../Model'

export default class WorkLogs extends Model {
  resource () {
    return 'work-log'
  }
  primaryKey () {
    return 'id'
  }
}
