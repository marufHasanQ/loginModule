import { open } from 'node:fs/promises';

const loginView= await open('../views/loginView.html');
const loginViewStream = loginView.createReadStream();

loginViewStream.on('data', (chunk) => console.log(chunk));

