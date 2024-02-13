import {verifyToken} from '../util/token/token.mjs';

function otherRouter(req, res) {

    console.log('otherRouter');
    let data = verifyToken(req, res);

}
export {otherRouter}
