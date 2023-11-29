import {Router} from 'express';
import { getClientes, postClientes, putClientes, deleteCLientes, getClientesById } from '../controllers/clientes.controller.js';
const router = Router();


router.get('/clientes', getClientes );

router.get('/clientes/:id', getClientesById );
 
router.post('/clientes', postClientes);

router.put('/clientes/:id', putClientes);

router.delete('/clientes/:id', deleteCLientes);

export default router;
