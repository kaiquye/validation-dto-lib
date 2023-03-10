"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAdapter = exports.ValidationObject = exports.DtoBase = void 0;
const class_validator_1 = require("class-validator");
const error = new Error();
class DtoBase {
    Id;
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
            console.log(req.body);
            console.log(path);
            console.log();
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
                default:
                    result = new classDto({ ...req.body });
                    error = await result.validate();
                    break;
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
function ControllerAdapter(controller) {
    return async function (req, res) {
        const body = req?.body;
        const params = { params: req?.params, query: req?.query };
        try {
            const result = await controller(body, params);
            const cookies = result.cookies;
            if (cookies) {
                res.cookie(cookies.name, cookies.value, { httpOnly: true });
            }
            return res.status(result?.status || 200).json(result?.body);
        }
        catch (error) {
            return res.status(500).json("error: internal, contact an administrator");
        }
    };
}
exports.ControllerAdapter = ControllerAdapter;
