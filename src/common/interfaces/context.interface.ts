import { Request, Response } from "express";


export interface Context {
	req: Request,
	res: Response,
	user?: any
}

export interface PatientContext {
	req: Request,
	res: Response,
	patient?: any
}