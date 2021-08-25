import { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user";
import { repoRoutes } from "./routes/repo";

const BASE: string = `/api/v1`

export default async function router(fastify: FastifyInstance) {
	fastify.register(userRoutes, { prefix: `${BASE}/user` });
	fastify.register(repoRoutes, { prefix: `${BASE}/repo` });
}