
import pg from 'pg';
const {Pool} = pg;

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

const connectionString = 'postgresql://postgres:ZqhDa2ZHuBX0SdYuUP1R@containers-us-west-39.railway.app:7706/railway';

function createConnectionPool() {

    return new Pool({
        connectionString

    })
}

export {createConnectionPool};
