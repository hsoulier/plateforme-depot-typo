import multer, { diskStorage } from "multer"
import fs from "fs"
import path from "path"

// const upload = multer({ dest: "public/uploads/current" })
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "public/uploads/current")
// 	},
// 	filename: (req, file, cb) => {
// 		const { name, firstname } = req.body
// 		const arrayFile = file.originalname.split(".")
// 		const extension = arrayFile[arrayFile.length - 1]
// 		cb(
// 			null,
// 			`${firstname}-${name}-${Math.random()
// 				.toString(36)
// 				.substr(2, 9)}.${extension}`
// 		)
// 	},
// })
// export const uploadFiles = upload.array("files", 10)

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "public/uploads/current")
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Math.random().toString(36).substr(2, 9)}`)
	},
})
export const upload = multer({ storage }).array("files", 10)

export const renameFiles = async (req, res) => {
	const files = req.files
	const { firstName, name } = req.body
	files.forEach((file) => {
		const a = file.originalname.split(".")
		const ext = a[a.length - 1]
		fs.renameSync(
			path.resolve(file.path),
			path.resolve(
				`${
					file.destination
				}/${firstName}-${name}-${Math.random()
					.toString(36)
					.substr(2, 9)}.${ext}`
			)
		)
	})
	res.json({ message: "Envoyé" })
}
