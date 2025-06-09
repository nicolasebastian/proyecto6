const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  asignatura: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    required: true
  }
});

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notas: [notaSchema]
}, { timestamps: true });

module.exports = mongoose.model('Estudiante', estudianteSchema);
