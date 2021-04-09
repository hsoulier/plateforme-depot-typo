import bcrypt from "bcrypt"
import fs, { statSync, readdirSync } from "fs"
import { join } from "path"

export function jsonReader(filePath, cb) {
	fs.readFile(filePath, (err, fileData) => {
		if (err) {
			return cb && cb(err)
		}
		try {
			const object = JSON.parse(fileData)
			return cb && cb(null, object)
		} catch (err) {
			return cb && cb(err)
		}
	})
}

export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export const delAt = (str) => {
	if (str[0] === "@") {
		return str.substring(1)
	} else {
		return str
	}
}

export const hashPassword = async (password, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds)
		return await bcrypt.hash(password, salt)
	} catch (error) {
		console.log(error)
	}
	return null
}

export const shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}
export const isDirectory = (path) => statSync(path).isDirectory()
export const getDirectories = (path) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isDirectory)

export const isFile = (path) => statSync(path).isFile()
export const getFiles = (path) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isFile)

export const getFilesRecursively = (path) => {
	let dirs = getDirectories(path)
	let files = dirs
		.map((dir) => getFilesRecursively(dir))
		.reduce((a, b) => a.concat(b), [])
	return files.concat(getFiles(path))
}
