"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationObject = exports.DtoBase = void 0;
const class_validator_1 = require("class-validator");
class DtoBase {
    async validate() {
        return (0, class_validator_1.validateOrReject)(this);
    }
}
exports.DtoBase = DtoBase;
function ValidationObject(classDto, path) {
    return async function (req, res, next) {
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
            if (error === undefined)
                return next();
        }
        catch (exception) {
            return res.status(400).json(exception);
        }
    };
}
exports.ValidationObject = ValidationObject;
