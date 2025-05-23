import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import {getAllUsers,getUserById,updateUser,deleteUser,updateUserRole} from "../controllers/usersController.js";

const router = express.Router();

router.use(verifyToken,checkRole('sysadmin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/role', updateUserRole);



export default router;
