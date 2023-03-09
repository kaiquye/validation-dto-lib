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
