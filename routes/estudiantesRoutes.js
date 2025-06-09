const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const verifyToken = require('../middlewares/auth');

// CRUD 
router.post('/', verifyToken, estudiantesController.crearEstudiante);
router.get('/', verifyToken, estudiantesController.obtenerEstudiantes);
router.get('/:id', verifyToken, estudiantesController.obtenerEstudiantePorId);
router.put('/:id', verifyToken, estudiantesController.actualizarEstudiante);
router.delete('/:id', verifyToken, estudiantesController.eliminarEstudiante);

// Filtros
router.get('/filtrar-por-nombre', verifyToken, estudiantesController.filtrarPorNombre);
router.get('/filtrar-por-curso', verifyToken, estudiantesController.filtrarPorCurso);
router.get('/filtrar-por-asignatura', verifyToken, estudiantesController.filtrarPorAsignatura);
router.get('/promedio-menor-a-4', verifyToken, estudiantesController.promedioMenorA4);
router.get('/promedio-mayor-a-4', verifyToken, estudiantesController.promedioMayorA4);
router.get('/nota-maxima', verifyToken, estudiantesController.notaMaxima);

module.exports = router;
