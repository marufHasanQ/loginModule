import pg from 'pg';
import  dotenv  from "dotenv";
const {Pool} = pg;
dotenv.config();
//const {Client} = require('pg')

/*
  const client = new Client({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "mydata"
})
*/

console.log('loslso');

const connectionString = process.env.CONNECTION_STRING;
//'postgresql://postgres:ZqhDa2ZHuBX0SdYuUP1R@containers-us-west-39.railway.app:7706/railway';

console.log(process.env.CONNECTION_STRING);
function createConnectionPool() {

    return new Pool( {
        connectionString
    }
    )
}

export {createConnectionPool};
