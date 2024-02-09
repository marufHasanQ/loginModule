import {unsetTokenToCookie} from '../util/token/token.mjs';

function logoutRouter(req, res) {
    res = unsetTokenToCookie(res);
}
export {logoutRouter}
