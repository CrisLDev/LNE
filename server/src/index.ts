import app from './app';
import {startConnection} from './database';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();