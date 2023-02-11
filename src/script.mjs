import  http  from "http";
import * as dotenv from 'dotenv'
import  jwt from 'jsonwebtoken'

//import {dbMakeQueries, dbInsertValues, dbDeleteRows} from './db/queryFunction.mjs';

dotenv.config();


http
    .createServer(requestListener) 
        .listen(9111,() => console.log('server is listening on port 9111'));

function requestListener(req,res) {

    if (req.url=== 'GET') {
       console.log('itisGET'); 
    }

    switch (req.url) {
        case '/login':
           console.log('login');
            break;
        case '/signin':
        
           console.log('signin');
            break;
            
    }


    console.log('okkk');
    res.writeHead(200);
        res.end('');

        //let body ='';
        //req.on('data', (data) => body += data)
        //req.on('end', () => {
            //console.log(req.url,req.method);
        //}) 
}
        
/*
dbMakeQueries([dbInsertValues('product')(new Map([['name','pineapple'],['sku','4014']])), dbDeleteRows('product')("name = 'sugercane'")
])
    .then((v) => console.log('from then',v) );



    
const  token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const decoded = jwt.verify(token,'shhhhh');
console.log(decoded);
    */
