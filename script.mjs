import * as dotenv from 'dotenv'
import  jwt from 'jsonwebtoken'

import {dbMakeQueries, dbInsertValues, dbDeleteRows} from './db/queryFunction.mjs';

dotenv.config()

console.log(process.env.RED);
console.log(jwt);
const  token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const decoded = jwt.verify(token,'shhhhh');
console.log(decoded);

/*
dbMakeQueries([dbInsertValues('product')(new Map([['name','pineapple'],['sku','4014']])), dbDeleteRows('product')("name = 'sugercane'")
])
    .then((v) => console.log('from then',v) );
    */
