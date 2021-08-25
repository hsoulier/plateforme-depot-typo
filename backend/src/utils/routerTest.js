import { Router } from "express"
import Word from "../models/Word.js"
import User from "../models/User.js"
import Repo from "../models/Repo.js"
import mongoose from "mongoose"
const router = Router()

/**
 * TODO:
 * - Convert the array of objects of ObjectId to Array of ObjectId
 * - Lookup on this array (acces the word and repo infos)
 */
router.get("/user/:id?", async (req, res) => {
	try {
		const _id = req.params.id
		const $match = _id ? { _id: mongoose.Types.ObjectId(_id) } : {}
		const repos = await User.aggregate([
			{ $match },
			{
				$lookup: {
					from: "repos",
					localField: "_id",
					foreignField: "userId",
					as: "repos",
				},
			},
			// {
			// 	$unset: [
			// 		"repos.userId",
			// 		"repos.__v",
			// 		"repos.files",
			// 		"repos.wordId",
			// 		"repos.date",
			// 	],
			// },
			{
				$addFields: {
					reposId: {
						$map: {
							input: "$repos",
							as: "r",
							in: {
								$unwind: {
									path: "r._id",
									preserveNullAndEmptyArrays: false,
								},
							},
						},
					},
				},
			},
			// {
			// 	$lookup: {
			// 		from: "words",
			// 		localField: "repos.wordId",
			// 		foreignField: "_id",
			// 		as: "repos.word",
			// 	},
			// },
		])
		return res.json(repos)
	} catch (error) {
		return res.json(error)
	}
})
router.get("/word/:word?", async (req, res) => {
	try {
		const word = req.params.word
		const $match = word ? { word } : {}
		const words = await Word.aggregate([
			{
				$match,
			},
			{
				$lookup: {
					from: "repos",
					localField: "_id",
					foreignField: "wordId",
					as: "repos",
				},
			},
			{
				$addFields: { nbRepos: { $size: "$repos" } },
			},
		])
		return res.json(words)
	} catch (error) {
		console.log(error)
		return res.json({ error })
	}
})
router.get("/repo/:repo?", async (req, res) => {
	try {
		const _id = req.params.repo
		const $match = _id ? { _id: mongoose.Types.ObjectId(_id) } : {}
		const repos = await Repo.aggregate([
			{ $match },
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$unwind: {
					path: "$user",
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$lookup: {
					from: "words",
					localField: "wordId",
					foreignField: "_id",
					as: "word",
				},
			},
			{
				$unwind: {
					path: "$word",
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$unset: ["wordId", "userId", "user.password"],
			},
		])
		return res.json(repos)
	} catch (error) {
		console.log(error)
		return res.json({ error })
	}
})

export default router
