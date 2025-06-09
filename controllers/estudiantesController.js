const Estudiante = require('../models/estudiantesModel');

// Crear estudiante
exports.crearEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante({
      ...req.body,
      userId: req.user.id
    });
    const estudianteGuardado = await nuevoEstudiante.save();
    res.status(201).json(estudianteGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};

// Obtener todos 
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find({ userId: req.user.id });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// obtener por ID
exports.obtenerEstudiantePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findOne({ _id: id, userId: req.user.id });
    if (!estudiante) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar estudiante' });
  }
};

// actualizar
exports.actualizarEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const estudianteActualizado = await Estudiante.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!estudianteActualizado) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    res.status(200).json(estudianteActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

// eliminar 
exports.eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Estudiante.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!eliminado) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    res.status(200).json({ msg: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

//filtro por nombre
exports.filtrarPorNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre || '';
    const estudiantes = await Estudiante.find({ nombre: new RegExp(nombre, 'i'), userId: req.user.id });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por nombre' });
  }
};

// filtro por curso
exports.filtrarPorCurso = async (req, res) => {
  try {
    const curso = req.query.curso;
    if (!curso) {
      return res.status(400).json({ error: 'El parámetro curso es obligatorio' });
    }
    const estudiantes = await Estudiante.find({ curso, userId: req.user.id });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por curso' });
  }
};

// Filtro por asignatura
exports.filtrarPorAsignatura = async (req, res) => {
  try {
    const asignatura = req.query.asignatura;
    if (!asignatura) {
      return res.status(400).json({ error: 'El parámetro asignatura es obligatorio' });
    }
    const estudiantes = await Estudiante.find({
      'notas.asignatura': asignatura,
      userId: req.user.id
    });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por asignatura' });
  }
};

// Promedio menor a 4
exports.promedioMenorA4 = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find({ userId: req.user.id });
    const filtrados = estudiantes.filter(est => {
      if (!est.notas.length) return false;
      const notas = est.notas.map(n => n.nota);
      const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
      return promedio < 4;
    });
    res.status(200).json(filtrados);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por promedio menor a 4.0' });
  }
};

// Promedio mayor a 4
exports.promedioMayorA4 = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find({ userId: req.user.id });
    const filtrados = estudiantes.filter(est => {
      if (!est.notas.length) return false;
      const notas = est.notas.map(n => n.nota);
      const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
      return promedio >= 4;
    });
    res.status(200).json(filtrados);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por promedio mayor o igual a 4.0' });
  }
};

// Nota máxima (retorna estudiantes que tengan la nota máxima 7 en cualquier asignatura)
exports.notaMaxima = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find({ userId: req.user.id });
    const filtrados = estudiantes.filter(est => est.notas.some(n => n.nota === 7));
    res.status(200).json(filtrados);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por nota máxima' });
  }
};
