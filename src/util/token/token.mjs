import jwt from 'jsonwebtoken'
//import * as dotenv from 'dotenv'
const COOKIE_NAME = 'tokenCookie';
//dotenv.config()

function setTokenToCookie(res, data, jwtCookieName = COOKIE_NAME) {

    //console.log('env variable', process.env);
    const token = getToken(data);
    res.setHeader('Set-Cookie', `${jwtCookieName}=${token}`);

    return token;
}

function unsetTokenToCookie(res, jwtCookieName = COOKIE_NAME) {

    res.setHeader('Set-Cookie', `${jwtCookieName}=`);
    return res;
}

function getToken(data, options = {expiresIn: '40s'}) {

    let token = jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, options)
    return token;
}

function verifyToken(req, res, jwtCookieName = COOKIE_NAME) {
    const jwtToken = getNamedCookie(req, jwtCookieName);

    console.log('jwtToken: ', jwtToken);
    if (!jwtToken) {
        throw 'need to login';
    }

    jwt.verify(jwtToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err, result) => {

        if (err instanceof jwt.TokenExpiredError) {

            const data = jwt.decode(jwtToken);
            delete data.exp;
            delete data.iat;
            setTokenToCookie(res, data);
            console.log('token timed out')
            return


        }

    })

    function getNamedCookie(req, jwtCookieName) {
        //https://stackoverflow.com/a/15724300
        const cookies = req.headers.cookie;


        const parts = `; ${cookies}`.split(`; ${jwtCookieName}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
}

export {verifyToken, setTokenToCookie, unsetTokenToCookie}
