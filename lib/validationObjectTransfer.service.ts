import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";

const error = new Error();

export abstract class DtoBase {
  public Id?: string;

  async validate() {
    return validateOrReject(this);
  }
}

type IPathValidation = "BODY" | "PARAM";

export function ValidationObject(classDto: any, path: IPathValidation) {
  const isDtoValid = classDto instanceof DtoBase;
  console.log(isDtoValid);

  if (isDtoValid === false) {
    error.message = "invalid dto class.";
    error.name = "invalid type";
    throw error;
  }

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let result;
      let error;

      switch (path) {
        case "BODY":
          result = new classDto({ ...req.body });
          error = await result.validate();
          break;
        case "PARAM":
          result = new classDto({ ...req.body });
          error = await result.validate();
          break;
        default:
          result = new classDto({ ...req.body });
          error = await result.validate();
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
    const params = req?.params;

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
