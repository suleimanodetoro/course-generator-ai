import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

// because we are in development mode, the server will always restart because of "hot reload functionality"
// why are we using this? Because each time the application reloads, it could potentially create a new instance of Prisma Client
// if there is already a cached instance, do not create a new prisma client instance 
export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}