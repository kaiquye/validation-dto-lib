import { NextFunction, Request, Response } from "express";
type IPathValidation = "BODY" | "PARAM";
export interface DtoBase {
    validate(): any;
}
export declare function ValidationObject(classDto: DtoBase | any, path: IPathValidation): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export {};
