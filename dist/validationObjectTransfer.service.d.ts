import { NextFunction, Request, Response } from "express";
export declare abstract class DtoBase {
    Id?: string;
    validate(): Promise<void>;
}
type IPathValidation = "BODY" | "PARAM";
export declare function ValidationObject(classDto: DtoBase | any, path: IPathValidation): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export {};
