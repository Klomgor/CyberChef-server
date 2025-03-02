import { Router } from "express";
const router = Router();
import { bake, Dish } from "cyberchef";

/**
 * bakePost
 */
router.post("/", async function bakePost(req, res, next) {
    try {
        const noRecipeOrInput = !req.body.input || !req.body.recipe;
        if (noRecipeOrInput) {
            throw new TypeError(`'${!req.body.input ? "input" : "recipe"}' property is required in request body`);
        }

        const dish = await bake(req.body.input, req.body.recipe);

        // Attempt to translate to another type. Any translation errors
        // propagate through to the errorHandler.
        if (req.body.outputType) {
            dish.get(req.body.outputType);
        }

        res.send({
            value: dish.value,
            type: Dish.enumLookup(dish.type),
        });

    } catch (e) {
        next(e);
    }
});

export default router;
