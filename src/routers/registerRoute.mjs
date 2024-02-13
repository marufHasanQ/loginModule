import {checkUserExistence, logger, addNewUser, validateUserInput} from "../util/util.mjs";
import {getUserInfo} from '../util/formData/formData.mjs'
import {setTokenToCookie} from '../util/token/token.mjs';
import {hash, verify} from '../util/hash.mjs';
function registerRouter(req, res) {
    let userInput;
    return getUserInfo(req)
        .then(v => userInput = v)
        .then(v => logger('formData', v))

        .then(v => validateUserInput(v))
        .then(v => logger('validateUserInput', v))

        .then(v => checkUserExistence(userInput.get('email')))
        .then(v => {if (v) throw 'User already exist'; return false;})

        .then(v => hash(userInput.get('password')))
        .then(v => logger('userPasswordHashed', v))

        .then(v => addNewUser(userInput, v))
        .then(v => setTokenToCookie(res, {name: "random"}))
        .then(v => logger('token set', v))
}
export {registerRouter}
