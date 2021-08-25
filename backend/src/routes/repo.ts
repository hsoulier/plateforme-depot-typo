import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { promises } from "fs";
import { resolve } from "path";

const { readFile } = promises;

export const repoRoutes = async (fastify: FastifyInstance) => {
	// GET /
	fastify.get("/", async function (
		_request: FastifyRequest,
		reply: FastifyReply
	) {
		reply.send("Hello Repo");
	});
}