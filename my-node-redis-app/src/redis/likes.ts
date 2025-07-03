import client from './redisClient.js';
import { userLikesKey, itemKey } from './keys.js';
import { Item } from '../types/item.js';

const getItems = async (ids: string[]): Promise<Item[]> => {
    const results = await Promise.all(ids.map(async id => {
        const data = await client.hGetAll(itemKey(id));
        return { id, ...data } as Item;
    }));
    return results;
};

export const userLikesItem = async (itemId: string, userId: string): Promise<boolean> => {
    return await client.sIsMember(userLikesKey(userId), itemId);
};

export const likedItems = async (userId: string): Promise<Item[]> => {
    const ids = await client.sMembers(userLikesKey(userId));
    return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string): Promise<void> => {
    const inserted = await client.sAdd(userLikesKey(userId), itemId);
    if (inserted > 0) {
        const newLikes = await client.hIncrBy(itemKey(itemId), 'likes', 1);
        console.log(`[LikeItem] ${userId} liked ${itemId}. Likes now: ${newLikes}`);
    }
};

export const unlikeItem = async (itemId: string, userId: string): Promise<void> => {
    const removed = await client.sRem(userLikesKey(userId), itemId);
    if (removed > 0) {
        const newLikes = await client.hIncrBy(itemKey(itemId), 'likes', -1);
        console.log(`[UnlikeItem] ${userId} unliked ${itemId}. Likes now: ${newLikes}`);
    }
};

export const commonLikedItems = async (userOneId: string, userTwoId: string): Promise<Item[]> => {
    const ids = await client.sInter([userLikesKey(userOneId), userLikesKey(userTwoId)]);
    return getItems(ids);
};
