import type { User, TodoList } from '@prisma/client';
import prisma from './prisma';
import redis from './redis';

type UserWithTodos = User & { todos: TodoList[] };

export const GetUserData = async (discordId: string, withTodos?: boolean): Promise<User | null> => {
  const isCached = await redis.get(`user:${discordId}`);

  if (isCached) {
    return JSON.parse(isCached);
  } else {
    return await prisma.user.findUnique({ where: { discordId }, include: { todos: withTodos } });
  }
};

export const GetUserDataWithTodos = async (discordId: string): Promise<UserWithTodos | null> => {
  const isCached = await redis.get(`user:${discordId}`);

  if (isCached) {
    return JSON.parse(isCached);
  } else {
    return await prisma.user.findUnique({ where: { discordId }, include: { todos: true } });
  }
};
