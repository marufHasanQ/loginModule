import {dbMakeQueries,dbSelectRows, dbInsertValues, dbDeleteRows,dbCheckExistence} from './db/queryFunction.mjs';
import bcrypt from 'bcryptjs'

function loginFunction(userInfo) {
    checkUserExistence(userInfo.email)
        .then(v => logger(v))
        .then(v => getUser(userInfo.email))
        .then(v => logger(v))
        .then(v => checkPassword(userInfo.password)(v.password))
        .catch( v => console.log(v));
    /*
        .then(v => jwt.sign(
            userInfo,
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        ));
        */
}
function checkPassword(inputPassword) {
    return dbPassword => bcrypt.compare(inputPassword,dbPassword)
}

function getUser(email) {
    return dbMakeQueries([dbSelectRows('user')(`email = '${email}'`)])
        .then((v) => v[0].value.rows[0])
}

function checkUserExistence(email) {
    const query = dbCheckExistence('user')(`email = '${email}'`)
    return dbMakeQueries([query])
        .then(v => console.log('wowowo', v[0].value.rows[0].exists ? 'yes' : 'no' ))
}

function logger(v) {
    console.log(v);
    return v;
}

bcrypt.hash('password',10)
    .then(logger)
    .then(v => bcrypt.compare('workin',v))
    .then(data => console.log(data));

//loginFunction({email:'xyz@gmail.com',password: 'password'});
