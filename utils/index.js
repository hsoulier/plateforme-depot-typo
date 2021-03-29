import fs from "fs"

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
