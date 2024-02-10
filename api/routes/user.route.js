import express from 'express'
import { updateUser } from '../controllers/user.controller.js';
<<<<<<< HEAD
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router()

router.post('/update/:id', verifyToken, updateUser);
=======
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.post('/update/:id',verifyToken,updateUser)
>>>>>>> 8273dd2ce9e1c410e56d13279af7014d6022b1df

export default router;