import fs, { statSync, readdirSync } from "fs"
import { join } from "path"
import bcrypt from "bcrypt"

export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}
const isDirectory = (path: string) => statSync(path).isDirectory()
const getDirectories = (path: string) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isDirectory)

const isFile = (path: string) => statSync(path).isFile()
const getFiles = (path: string) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isFile)

export const getFilesRecursively = (path: string): string[] => {
	let dirs = getDirectories(path)
	let files = dirs
		.map((dir) => getFilesRecursively(dir))
		.reduce((a, b) => a.concat(b), [])
	return files.concat(getFiles(path))
}

export function jsonReader(filePath: fs.PathOrFileDescriptor, cb: any) {
	fs.readFile(filePath, (err, fileData) => {
		if (err) {
			return cb && cb(err)
		}
		try {
			const object = JSON.parse(fileData.toString())
			return cb && cb(null, object)
		} catch (err) {
			return cb && cb(err)
		}
	})
}

export function formatBytes(bytes: number, decimals = 2) {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export const delAt = (str: string) => {
	if (str[0] === "@") {
		return str.substring(1)
	} else {
		return str
	}
}

export const hashPassword = async (password: any, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds)
		return await bcrypt.hash(password, salt)
	} catch (error) {
		console.log(error)
	}
	return null
}
