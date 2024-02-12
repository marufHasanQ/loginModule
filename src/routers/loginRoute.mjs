import {setTokenToCookie} from '../util/token/token.mjs';
import {getUserInfo} from '../util/formData/formData.mjs'

function loginRouter(req, res) {
    getUserInfo(req)
        .then(v => console.log(v))
    setTokenToCookie(res, {name: "random"})
}
export {loginRouter};

