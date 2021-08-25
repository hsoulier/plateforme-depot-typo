"use strict";
// import multer, { diskStorage } from "multer"
// const storage = multer.diskStorage({
// 	destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
// 		cb(null, "public/uploads/current")
// 	},
// 	filename: (req: { body: { [key: string]: string } }, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) => {
// 		const { name, firstName } = req.body
// 		const arrayFile = file.originalname.split(".")
// 		const extension = arrayFile[arrayFile.length - 1]
// 		cb(
// 			null,
// 			`${firstName}-${name}-${Math.random()
// 				.toString(36)
// 				.substr(2, 9)}.${extension}`
// 		)
// 	}
// })
// export default multer({ storage }).array("files", 10)
//# sourceMappingURL=multer.js.map