import user from './user';
import system from './system'
import weapp from './weapp/index'

export default {
    ...user,
    ...system,
    ...weapp
}