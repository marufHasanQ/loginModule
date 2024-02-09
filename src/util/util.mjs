
import {dbMakeQueries, dbSelectRows, dbInsertValues, dbDeleteRows, dbCheckExistence} from './db/queryFunction.mjs';

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

function getUserData(email) {
    return dbMakeQueries([dbSelectRows('users')('password')(`email = '${email}'`)])
        .then((v) => v[0].value.rows[0])
}

function checkUserExistence(email) {
    const query = dbCheckExistence('users')(`email = '${email}'`)
    return dbMakeQueries([query])
        .then(v => v[0].value.rows[0].exists)
}

function checkPassword(userPassword) {
    return dbPassword => bcrypt.compare(userPassword, dbPassword)
}

function getUserPassword(email) {
    return dbMakeQueries([dbSelectRows('users')(['password'])(`email = '${email}'`)])
        .then((v) => v[0].value.rows[0].password//v[0].value.rows[0]
            //console.log(v[0].value.rows[0].password)

        )
}

function addNewUser(userInput) {
    return bcrypt.hash(userInput.password, 10)
        .then(hash => {
            const userInfoMap = new Map([['email', userInput.email], ['password', hash]]);
            return userInfoMap;

        })
        .then(userInfoMap => dbMakeQueries([dbInsertValues('users')(userInfoMap)]));
}


function logger(v) {
    console.log(v);
    return v;
}

function createJWT(key) {
    return expiresTime => data => {
        return jwt.sign(
            data,
            key,
            {
                expiresIn: expiresTime,
            }
        )
    }
}
bcrypt.hash('pass', 10)
    .then(data => bcrypt.compare('pass', data))
    .then(console.log);


function getUserInfo(req) {
    return getFormData(req)
        //.then(v => console.log('dodo', v))
        .then(v => parseFormData(v))
        .then(v => console.log('formData', v));

    function getFormData(req) {
        let data = '';
        req.on('data', chunk => data = data + chunk)
        return new Promise((resolve, reject) => {
            req.on('end', chunk => {resolve(data)})
        }
        )
    }
    function parseFormData(formData) {
        return new Map(formData
            .split('&')
            .map(v => v
                .split('='))
        );
    }
}

/*
 bcrypt.hash('password', 10)
    .then(logger('hash'))
    .then(logger)
    .then(v => bcrypt.compare('password', v))
    .then(data => console.log(data));
*/
//export{ checkUserExistence ,createJWT, logger, get
export {getUserPassword, getUserData, checkPassword, checkUserExistence, logger, createJWT, addNewUser, getUserInfo};
