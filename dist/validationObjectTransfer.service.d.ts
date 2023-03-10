import { NextFunction, Request, Response } from "express";
export declare abstract class DtoBase {
    Id?: string;
    validate(): Promise<void>;
}
type IPathValidation = "BODY" | "PARAM";
export declare function ValidationObject(classDto: any, path: IPathValidation): (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export interface IHttpResponse {
    status?: number;
    body?: object | string;
    cookies?: {
        name: string;
        value: string;
    };
}
export type ControllerBase = (body: object, params?: object, next?: NextFunction) => Promise<IHttpResponse>;
export declare function ControllerAdapter(controller: ControllerBase): (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
