import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FollowUp } from "../entity/follow-up.entity";

export const Get = async (req: Request, res: Response) => {
	const followUp = await getRepository(FollowUp).findOne({
		where: {
			id: parseInt(req.params["id2"])
		}
	});

	res.send({
		"reviwer": followUp?.reviwer,
		"recommended-actions": followUp?.recommendedActions,
		"rapporter": followUp?.rapporter,
		"carred-out": followUp?.carredOut	
	});
};

export const Create = async (req: Request, res: Response) => {
	const body = req.body;

	await getRepository(FollowUp).save({
		id: parseInt(req.params["id2"]),
		reviwer: body["reviwer"],
		recommendedActions: body["recommended-actions"],
		rapporter: body["rapporter"],
		carredOut: body["carred-out"]
	});

	res.send({
		"reviwer": body["reviwer"],
		"recommended-actions": body["recommended-actions"],
		"rapporter": body["rapporter"],
		"carred-out": body["carred-out"]	
	});
};

export const Update = async (req: Request, res: Response) => {
	const body = req.body;
	
	await getRepository(FollowUp).update(parseInt(req.params["id2"]), {
		reviwer: body["reviwer"],
		recommendedActions : body["recommended-actions"],
		rapporter: body["rapporter"],
		carredOut: body["carred-out"]
	});

	res.send({
		"reviwer": body["reviwer"],
		"recommended-actions": body["recommended-actions"],
		"rapporter": body["rapporter"],
		"carred-out": body["carred-out"]	
	});
}