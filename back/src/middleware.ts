import Joi from "joi";
import {Request, Response, NextFunction} from "express";

// to do : correctly type this
const validate: (scheme: object, location: string) =>
(req: any, res: Response, next: NextFunction) => any =
    (scheme, location) => {
        return (req, res, next) => {
            if (Joi.validate(req[location], scheme).error != null)
                res.status(400).send("BAD_REQUEST");
            else
                next();
        };
    };

export default validate;