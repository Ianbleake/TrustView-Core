import { Router } from "express"
import oauthRoutes from "./oauthRoutes.js"
import reviewRoutes from "./reviewRoutes.js"
import healthRoutes from "./healthRoutes.js"


const router = Router()

router.use(healthRoutes)                
router.use("/oauth", oauthRoutes)       
router.use("/reviews", reviewRoutes)

export default router
