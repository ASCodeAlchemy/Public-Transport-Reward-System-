import { Router } from "express";
import { registerCollaborator, loginCollaborator } from "../controller/collab.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyReward } from "../controller/collab.controller.js";
import { claimReward } from "../controller/rewards.controller.js";
const router = Router();

router.route('/register').post(registerCollaborator);
router.route('/login').post(loginCollaborator);
router.route('/verify').post(verifyJWT, verifyReward);
router.route('/claim').post(verifyJWT, claimReward, (req, res) => {
   
    res.status(200).json(new ApiResponse(200, req.reward, "Reward claimed successfully"));
});

export default router;
    