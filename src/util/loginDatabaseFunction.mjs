import {checkUserExistence, getUserPassword, logger} from './util.mjs';

function loginDatabaseFunction(userInput) {
    return checkUserExistence(userInput.get('email'))
        .then(v => logger('checkUserExistence', v))
        //TODO  if users doesn't exist Promise.reject()
        .then(v => {if (v) return true; throw 'User doesnt exist';})
        .then(v => getUserPassword(userInput.get('email')))
    /*
        .then(v => getUserData(userInput.email))
        .then(v => logger(v))
        .catch(v => console.log(v));
        */
}


export {loginDatabaseFunction};
