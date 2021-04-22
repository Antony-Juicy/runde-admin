import formwork from './formwork';
import account from './account';
import label from './label';
import user from './user';
import graphicMessage from './graphicMessage';

export default {
    ...formwork,
    ...account,
    ...label,
    ...user,
    ...graphicMessage
}