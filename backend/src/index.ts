import fastify from "fastify"
import fastifyCors from "fastify-cors"
import helmet from "fastify-helmet"
import fastifyStatic from "fastify-static"
import { join } from "path"
import router from "./router"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()


mongoose
	.connect(process.env.DB_URI || "", {})
	.then(() => {
		console.log("Connected")
	})
	.catch((err) => {
		console.error(`connection error: ${err}`)
	})

const server = fastify({
	// logger: !!(process.env.NODE_ENV !== "development"),
	logger: false
})
server.register(fastifyCors, {})
server.register(
	helmet,
	{ contentSecurityPolicy: false }
)
server.register(fastifyStatic, {
	root: join(__dirname, "public"),
	prefix: "/public/",
})
server.register(router)

server.listen(process.env.PORT || 3000, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})


export default server