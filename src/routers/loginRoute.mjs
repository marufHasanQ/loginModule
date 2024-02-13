import {logger} from '../util/util.mjs';
import {hash, verify} from '../util/hash.mjs';
import {setTokenToCookie} from '../util/token/token.mjs';
import {getUserInfo} from '../util/formData/formData.mjs'
import {loginDatabaseFunction} from '../util/loginDatabaseFunction.mjs'

function loginRouter(req, res) {
    let userInput;
    return getUserInfo(req)
        .then(v => userInput = v)
        .then(v => logger('formData', v))

        .then(v => loginDatabaseFunction(v))
        .then(v => logger('userPasswordHashed', v))

        .then(v => logger('userPasswordUnhased', userInput.get('password')))
        .then(v => verify(userInput.get('password'), v))
        .then(v => logger('verify', v))

        .then(v => setTokenToCookie(res, {name: "random"}))
        .then(v => logger('token set', v))

}
export {loginRouter};

