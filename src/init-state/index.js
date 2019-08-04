import userStateInit from './userReducer';
import spotStateInit from './spotReducer';

export default {
    ...userStateInit,
    ...spotStateInit
}