import {Router, Request, Response} from "express";
import Joi from "joi";
import {validate, checkDuplicate} from "./middleware";
import ApiWrapper from "./apiWrapper";

const scheme = {
    base_currency: Joi.string().required(),
    value: Joi.number().required(),
    quote_currency: Joi.string().required()
};

const router = Router();

const apiWrapper = new ApiWrapper();

router.use('/convert', validate(scheme, "body"));
router.use('/convert', checkDuplicate);

router.post('/convert', async (req: Request, res: Response) => {
    let {base_currency, value, quote_currency} = req.body;
    let result = await apiWrapper.convert(base_currency, quote_currency, value);

    if (result.error != null)
        res.status(result.error.code).json({
            result: "failure",
            error: result.error.response,
        });
    else {
        res.status(200).json({
            result: "success",
            value: result.data
        });
    }
});

export default router;