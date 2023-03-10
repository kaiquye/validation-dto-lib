import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";

const error = new Error();

export abstract class DtoBase {
  public Id?: string;

  async validate() {
    return validateOrReject(this);
  }
}

type IPathValidation = "BODY" | "PARAM" | "QUERY" ;


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

export function ValidationObject(classDto: any, path: IPathValidation) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<Response | void>{
    try {
      let result;
      let error;

      switch (path) {
        case "BODY":
          result = new classDto({ ...req.body });
          result.name;
          error = await result.validate();
          break;
        case "PARAM":
          result = new classDto({ ...req.body });
          error = await result.validate();
          break;
        case "QUERY":
          result = new classDto({ ...req.body });
          error = await result.validate();
          break;
        default:
          result = new classDto({ ...req.body });
          error = await result.validate();
          break;
      }
      if (error === undefined) return next();
    } catch (exception) {
      return res.status(400).json(exception);
    }
  };
}

export interface IHttpResponse {
  status?: number;
  body?: object | string;
  cookies?: { name: string; value: string };
}

export type ControllerBase = (
  body: object,
  params?: object,
  next?: NextFunction
) => Promise<IHttpResponse>;

export function ControllerAdapter(controller: ControllerBase) {
  return async function (req: Request, res: Response) {
    const body = req?.body;
    const params = {params: req?.params, query: req?.query}

    try {
      const result = await controller(body, params);
      const cookies = result.cookies;

      if (cookies) {
        res.cookie(cookies.name, cookies.value, { httpOnly: true });
      }

      return res.status(result?.status || 200).json(result?.body);
    } catch (error) {
      return res.status(500).json("error: internal, contact an administrator");
    }
  };
}
