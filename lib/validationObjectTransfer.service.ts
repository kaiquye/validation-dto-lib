import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";
type IPathValidation = "BODY" | "PARAM";

export abstract class DtoBase {
  async validate() {
    return validateOrReject(this);
  }
}

export function ValidationObject(
  classDto: DtoBase | any,
  path: IPathValidation
) {
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
