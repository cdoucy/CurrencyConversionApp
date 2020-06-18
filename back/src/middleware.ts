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

const checkDuplicate = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.base_currency == req.body.quote_currency)
        res.status(400).send("Trying to convert same currencies.");
    else
        next();
};

export {validate, checkDuplicate};