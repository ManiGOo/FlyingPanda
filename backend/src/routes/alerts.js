import { Router } from "express";
import {
    getAlerts,
    createAlert,
    updateAlertStatus,
    deleteAlert
} from "../controllers/alertController.js"
import { validateCreate, validateStatusUpdate } from "../middleware/validator.js";

const router = Router();

router.get('/', getAlerts);
router.post('/', validateCreate, createAlert);
router.put('/:id', validateStatusUpdate, updateAlertStatus);
router.delete('/:id', deleteAlert)

export default router;