import user from './user';
import system from './system'
import chance from './chance'
import weapp from './weapp/index'
import activity from './activity/index'
import order from './order'
import officialAccounts from './official-accounts'
import classmanage from './classmanage'
import project from './project'

export default {
    ...user,
    ...system,
    ...weapp,
    ...chance,
    ...activity,
    ...order,
    ...officialAccounts,
    ...classmanage,
    ...project,
}