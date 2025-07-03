import client, { connectRedis, disconnectRedis} from './redis/redisClient.js';
import { likeItem, unlikeItem, likedItems, userLikesItem, commonLikedItems } from './redis/likes.js';

const loadCars = async () => {
    await client.hSet('car1', {
        color: 'red',
        model: 'Tesla',
        year: 2023,
        likes: 0
    });
    await client.hSet('car2', {
        color: 'blue',
        model: 'Mustang',
        year: 2024,
        likes: 0
    });
    await client.hSet('car3', {
        color: 'white',
        model: 'Ford',
        year: 2025,
        likes: 0
    });
    
    // actually its keys
    const ids = [1,2,3].map(id => {
        return client.hGetAll(`car${id}`);
    })
    
    const cars = await Promise.all(ids);
    console.log(cars);
};

const simulateUserInteractions = async (user1Id: string, user2Id: string) => {
    await likeItem('1', user1Id);
    await likeItem('1', user2Id);
    await likeItem('2', user1Id);

    console.log(`\n--- Checking Likes for ${user1Id} ---`);
    const user1Likes = await likedItems(user1Id);
    console.log(`[${user1Id} Liked Items]`, user1Likes);

    console.log(`\n--- Checking Common Liked Items between ${user1Id} and ${user2Id} ---`);
    const common = await commonLikedItems(user1Id, user2Id);
    console.log('[Common Liked Items]', common);

    console.log(`\n--- Checking if ${user1Id} liked item 1 ---`);
    const hasLiked = await userLikesItem('1', user1Id);
    console.log(`[userLikesItem] ${user1Id} liked item 1: ${hasLiked}`);

    console.log(`\n--- ${user1Id} Unlikes Item 2 ---`);
    await unlikeItem('2', user1Id);
    console.log(`[${user1Id} Liked Items after unliking item 2]`, await likedItems(user1Id));
};

const main = async () => {
    try {
        await connectRedis();
        
        // await loadCars();

        const user1 = 'alice';
        const user2 = 'bob';
        await simulateUserInteractions(user1, user2);
        
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    } finally {
        await disconnectRedis();
    }
};

main();