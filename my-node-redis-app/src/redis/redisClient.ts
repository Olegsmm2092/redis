import 'dotenv/config';
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!, 10)
    }
});



export const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log('Connected to Redis');
    }
};

export const disconnectRedis = async () => {
    if (client.isOpen) {
        await client.disconnect();
        console.log('Disconnected to Redis');
    }
};

export default client;
