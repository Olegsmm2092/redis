import 'dotenv/config';
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result);  // >>> bar

const run = async () => {
    await client.hSet('car1', {
        color: 'red',
        model: 'Tesla',
        year: 2023
    });
    await client.hSet('car2', {
        color: 'blue',
        model: 'Mustang',
        year: 2024
    });
    await client.hSet('car3', {
        color: 'white',
        model: 'Ford',
        year: 2025
    });

    const cars = await Promise.all([
        client.hGetAll('car1'),
        client.hGetAll('car2'),
        client.hGetAll('car3')
    ]);
    console.log(cars);
};

run();