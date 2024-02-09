import {verifyToken} from '../util/token/token.mjs';

function otherRouter(req, res) {

    let data = verifyToken(req, res);

}
export {otherRouter}
