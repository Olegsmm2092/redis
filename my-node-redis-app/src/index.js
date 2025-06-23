import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '1dvni4MD2U8VUVIbP6tQq6iARCWW30Qt',
    socket: {
        host: 'redis-11015.c17.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 11015
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result);  // >>> bar