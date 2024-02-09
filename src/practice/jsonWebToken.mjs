import jwt from "jsonwebtoken"

console.log(jwt);

let token = jwt.sign({username: 'name', passward: 'passward'}, 'secret string', {expiresIn: '1s'})
console.log(token);
setTimeout(() => {
    // decodes the data without verifing the signature or checking if the token expired, not recomended
    let decoded = jwt.decode(token);
    console.log(decoded);
    // it should  throw error as the jwt is to expire before the verify process can take place.  
    let verifyed = jwt.verify(token, 'secret string');
    console.log(verifyed);
    console.log('timeout')
}, 10000);
