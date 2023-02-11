import { addNewUser, createJWT, getUserData, checkPassword, checkUserExistence, getUserPassword } from "./util.mjs";

describe('testing function of util.mjs', function() {
   it('checking createJWT', function() {
const JWT = createJWT('key')('5s')({foo:'bar'});
     expect(typeof(JWT)).toBe('string');
   }); 
   test('check password of the test user', function() {
      return getUserPassword('test@gmail.com')
       .then(data =>  {  expect( data).toBe('$2a$10$llWLomQ0rvAZMNiRjxalZ.Or6QQlkepXPaMS8UbZhTzVaT7p9u6Am')});
   }); 

   it('compare encrypt password stored in DB with user given password', function() {
checkPassword ('pass') ('$2a$10$llWLomQ0rvAZMNiRjxalZ.Or6QQlkepXPaMS8UbZhTzVaT7p9u6Am')
       .then(data => expect(data).toBeTruthy());
   }); 

    it('check existance of test user', function() {
checkUserExistence('test@gmail.com')
        .then(data => expect(data).toBeTruthy());
   })
    /*
    it('add new user', function() {
        addNewUser({email: 'test@gmail.com', password :'pass'})
        .then(data => console.log(data));
   })
   */
});


