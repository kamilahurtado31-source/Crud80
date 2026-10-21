const { Router } = require('express');
const {
    listarController,
    obtenerPorIdController,
    crear,
    actualizarController,
    eliminarController
} = require('../controllers/usuariosController.js');

const router = Router();

router.get('/listado', listarController);
router.post('/crear', crear);
router.put('/:id', actualizarController);
router.delete('/:id', eliminarController);

module.exports = router;