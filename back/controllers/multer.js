import multer, { diskStorage } from "multer"

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/current")
	},
	filename: (req, file, cb) => {
		const { name, nickname } = req.body
		const arrayFile = file.originalname.split(".")
		const extension = arrayFile[arrayFile.length - 1]
		cb(
			null,
			`${name}-${nickname}-${Math.random()
				.toString(36)
				.substr(2, 9)}.${extension}`
		)
	},
})

export default multer({ storage }).array("files", 10)
