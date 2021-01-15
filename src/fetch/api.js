import user from './user';
import system from './system'
import chance from './chance'
import weapp from './weapp/index'

export default {
    ...user,
    ...system,
    ...weapp,
    ...chance
}