export interface UserDoc extends mongoose.Document {
	name: string,
	email: string,
	password: string,
	isAdmin: boolean,
	socials: object,
}