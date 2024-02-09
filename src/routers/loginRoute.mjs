import {setTokenToCookie} from '../util/token/token.mjs';
import {getUserInfo} from '../util/util.mjs'

function loginRouter(req, res) {
    getUserInfo(req)
        .then(v => console.log(v))
    console.log('loginRouter');
    setTokenToCookie(res, {name: "random"})
}
export {loginRouter};

