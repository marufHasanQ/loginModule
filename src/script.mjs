import * as dotenv from 'dotenv'
dotenv.config();
import http from "http";
import {loginRouter} from "./routers/loginRoute.mjs";
import {logoutRouter} from "./routers/logoutRoute.mjs";
import {otherRouter} from "./routers/otherRoute.mjs";
import {registerRouter} from "./routers/registerRoute.mjs";
import {setTokenToCookie, verifyToken, unsetTokenToCookie} from './util/token/token.mjs';

http
    .createServer(requestListener)
    .listen(9111, () => console.log('server is listening on port 9111'));

function requestListener(req, res) {
    if (req.url === '/register') {
        registerRouter(req, res)
            .then(v => res.end('registration successfull'))
            .catch((e) => {
                console.log(e);
                res.end(e);
            })

    }
    else if (req.url === '/login') {
        console.log(req.url);
        loginRouter(req, res)
            .then(v => res.end('login successfull'))
            .catch(e => {
                console.log('error', e);
                res.end(e);
            })
        console.log('inside login');
        // res.end('inside login\n');
        return;
    }

    else if (req.url === '/logout') {

        console.log(req.url);
        logoutRouter(req, res);

        res.writeHead(200);
        res.end('inside logout');
        return;

    }

    else if (req.url === '/favicon.ico') {
        res.end();
        return;
    }

    else {
        console.log(req.url);
        try {
            // console.log(Object.keys(res.getHeaders()));

            otherRouter(req, res);
            res.end('okk');
        }
        catch (e) {
            console.log('');
            res.end(e);
        }
    }


}
