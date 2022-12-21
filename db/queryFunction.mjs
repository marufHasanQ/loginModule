import {createConnectionPool} from './db.mjs'
const pool = createConnectionPool();

function dbQuery(pool) {
    return queries => {
        return Promise.allSettled(queries.map(v => pool.query(v)))
    }
}

function dbInsertValues(tableName) {
    return   insertValuesMap =>  {
        const [keys,values] =   separateKeyValueFromMap(insertValuesMap);
        const query =`insert into ${tableName} (${keys}) values  (${values} )`;
        return query;
    }
}

function dbDeleteRows(tableName) {
    return conditions => {
        const query = `delete from ${tableName} where ${conditions}`;
        return query;
    }
}

function dbSelectRows(tableName) {
    return collumns => conditions => {
        const query = `select ${collumns.join(',')} from ${tableName} where ${conditions};`;
        return query;
    }
}

function dbCheckExistence(tableName) {
    return conditions =>{
        const query = `select exists(select 1 from ${tableName} where ${conditions})`;
        return query;
    }
}

function separateKeyValueFromMap(map) {
    const keys =    [...map.keys()];
    const values = keys.reduce((acc,v) =>  [...acc , map.get(v)],[] ).map(v => "'" + v + "'") ;
    return [keys.join(','),values.join(',')];
}

const dbMakeQueries = dbQuery(pool);
export {dbMakeQueries,dbInsertValues,dbDeleteRows,dbCheckExistence,dbSelectRows};



//console.log(dbSelectRows('product')(['*'])("name = 'orange'"))

/*

dbMakeQueries([`select column_name, data_type from information_schema.columns where table_name = 'product';`])
    .then(v => console.log(v[0].value));

pool.query("select exists(select 1 from product where name='orange')")
    .then((v)=> console.log(v));
//    .then(() => pool.end());
let testMap = new Map([['name','onion'],['sku','4018']])

dbQuery(pool)(['select * from product'])
    .then(v => console.log(v.keys()))
    .then(() => pool.end());

//    .then((array) => array.forEach( console.log));
//new Map([['a','5'],['b',2]]);
console.log(separateKeyValueFromMap(testMap));

*/
