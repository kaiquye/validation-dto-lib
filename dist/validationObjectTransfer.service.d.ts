import { NextFunction, Request, Response } from "express";
type IPathValidation = "BODY" | "PARAM";
export declare abstract class DtoBase {
    validate(): Promise<void>;
}
export declare function ValidationObject(classDto: DtoBase | any, path: IPathValidation): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export {};
