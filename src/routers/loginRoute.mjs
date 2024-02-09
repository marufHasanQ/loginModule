import {setTokenToCookie} from '../util/token/token.mjs';
function loginRouter(req, res) {

    setTokenToCookie(res, {name: "random"})
}
export {loginRouter};

