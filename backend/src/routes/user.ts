import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { RouteGenericInterface, RouteShorthandOptionsWithHandler } from "fastify/types/route"
import { Server, IncomingMessage } from "http"
import { addingUser, loginUser } from "../controllers/user"
import bcrypt from "bcrypt"
import User from "../models/User"
import { createToken } from "../controllers/global"



interface Body {

}

export const userRoutes = async (fastify: FastifyInstance) => {

	fastify.get("/", async function (
		_request: FastifyRequest,
		reply: FastifyReply
	) {
		reply.send("Hello User")
	})
	// @Route POST /login
	fastify.post("/login", {
		schema: {
			body: {
				type: "object",
				properties: {
					email: {
						type: "string"
					},
					password: {
						type: "string"
					}
				}
			},
		}
	}, loginUser)

	// @Route POST /signin
	fastify.post("/signin", {
		schema: {
			body: {
				type: "object",
				properties: {
					email: {
						type: "string"
					},
					password: {
						type: "string"
					}
				}
			},
		}
	}, addingUser)


}