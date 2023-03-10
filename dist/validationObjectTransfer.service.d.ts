import { NextFunction, Request, Response } from "express";
export declare abstract class DtoBase {
    Id?: string;
    validate(): Promise<void>;
}
type IPathValidation = "BODY" | "PARAM" | "QUERY";
/**
 * * @author Kaic Mendes <https://github.com/kaiquye>
 * @param classDto
 * @param [IPathValidation] path - "BODY"
 * @return {void}
 * @constructor
 * ```ts
 * import Validator from 'validation-dto-lib';
 *
 * class UserDto {
 *     @IsString()
 *     login: string;
 *     @IsString()
 *     password: string;
 * }
 *
 * app.post(
 *     "/login",
 *     validator.ValidationObject(UserDto, "BODY"),
 *     UserController.execute
 * );
 * validator.ValidationObject(UserDto, "BODY"),
 * ```
 */
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
