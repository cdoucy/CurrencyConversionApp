import {Router, Request, Response} from "express";
import Joi from "joi";
import validate from "./middleware";
import ApiWrapper from "./apiWrapper";

const scheme = {
    base_currency: Joi.string().required(),
    value: Joi.number().required(),
    quote_currency: Joi.string().required()
};

const router = Router();

const apiWrapper = new ApiWrapper();

router.post('/convert', validate(scheme, "body"), async (req: Request, res: Response) => {
    let {base_currency, value, quote_currency} = req.body;
    let result = await apiWrapper.convert(base_currency, quote_currency);

    if (result.error != null)
        res.status(result.error.code).json({
            result: "failure",
            error: result.error.response,
        });
    else {
        res.status(200).json({
            result: "success",
            value: Number(result.data.rates[quote_currency]) * value
        });
    }
});

export default router;