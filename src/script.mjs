import http from "http";
import * as dotenv from 'dotenv'
import {loginRouter} from "./routers/loginRoute.mjs";
import {logoutRouter} from "./routers/logoutRoute.mjs";
import {otherRouter} from "./routers/otherRoute.mjs";
import {setTokenToCookie, verifyToken, unsetTokenToCookie} from './util/token/token.mjs';
//import {dbMakeQueries, dbInsertValues, dbDeleteRows} from './db/queryFunction.mjs';

dotenv.config();

http
    .createServer(requestListener)
    .listen(9111, () => console.log('server is listening on port 9111'));


function requestListener(req, res) {

    if (req.url === '/login') {
        console.log(req.url);
        loginRouter(req, res);

        console.log('inside login');
        console.log(req.headers.cookie);
        res.writeHead(200);
        res.end('inside login');
        return;
    }

    else if (req.url === '/logout') {

        console.log('logout');
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
        catch {
            res.end('need to login');
        }
    }


}
