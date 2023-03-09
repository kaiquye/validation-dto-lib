"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationObject = void 0;
function ValidationObject(classDto, path) {
    return async function (req, res, next) {
        try {
            let result;
            let error;
            switch (path) {
                case "BODY":
                    result = new classDto({ ...req.body });
                    error = await result.validate();
                case "PARAM":
                    result = new classDto({ ...req.body });
                    error = await result.validate();
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
