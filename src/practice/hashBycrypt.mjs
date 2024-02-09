import  bcrypt  from "bcryptjs"

//console.log('logginh',bcrypt);
const pass = 'arandompass';

let hashh ;
bcrypt.hash(pass,10)

.then(hash => {hashh = hash; console.log('hash', hash)})

.then(hash => bcrypt.compare(pass , hashh) )

.then( v => v? console.log('matched') : console.log('not matched'));

