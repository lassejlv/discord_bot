import type { User } from "@prisma/client";
import prisma from "./prisma";
import redis from "./redis";

export const GetUserData = async (discordId: string): Promise<User | null> => {
  const isCached = await redis.get(`user:${discordId}`);

  if (isCached) {
    return JSON.parse(isCached)
  } else {
    return await prisma.user.findUnique({ where: { discordId } });
  }
}
