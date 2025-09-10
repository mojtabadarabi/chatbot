import { Router } from 'express';
import authRoutes from './authRoutes';
import messageRoutes from './messageRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/message', messageRoutes);
//@ts-ignore
router.use('/hi',(req,res,next)=>{
    return res.status(200).json({message:'hi'})
})

export default router;