import client, { connectRedis, disconnectRedis} from './redis/redisClient.js';


const loadCars = async () => {
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
    
    // actually its keys
    const ids = [1,2,3].map(id => {
        return client.hGetAll(`car${id}`);
    })
    
    const cars = await Promise.all(ids);
    console.log(cars);
};

const main = async () => {
    try {
        await connectRedis();
        
        await loadCars();
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    } finally {
        await disconnectRedis();
    }
};

main();