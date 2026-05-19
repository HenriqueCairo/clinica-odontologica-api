const prisma = require('../lib/prisma');

async function listPatients(req, res) {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        appointments: true
      }
    });

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar pacientes',
      error: error.message
    });
  }
}

async function getPatientById(req, res) {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        appointments: true
      }
    });

    if (!patient) {
      return res.status(404).json({
        message: 'Paciente não encontrado'
      });
    }

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar paciente',
      error: error.message
    });
  }
}

async function createPatient(req, res) {
  try {
    const { name, phone, birthDate } = req.body;

    if (!name || !phone || !birthDate) {
      return res.status(400).json({
        message: 'Nome, telefone e data de nascimento são obrigatórios'
      });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        phone,
        birthDate: new Date(birthDate)
      }
    });

    return res.status(201).json({
      message: 'Paciente criado com sucesso',
      patient
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar paciente',
      error: error.message
    });
  }
}

async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, birthDate } = req.body;

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) }
    });

    if (!patientExists) {
      return res.status(404).json({
        message: 'Paciente não encontrado'
      });
    }

    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: {
        name,
        phone,
        birthDate: birthDate ? new Date(birthDate) : patientExists.birthDate
      }
    });

    return res.status(200).json({
      message: 'Paciente atualizado com sucesso',
      patient
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar paciente',
      error: error.message
    });
  }
}

async function deletePatient(req, res) {
  try {
    const { id } = req.params;

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) }
    });

    if (!patientExists) {
      return res.status(404).json({
        message: 'Paciente não encontrado'
      });
    }

    await prisma.patient.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({
      message: 'Paciente deletado com sucesso'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao deletar paciente',
      error: error.message
    });
  }
}

module.exports = {
  listPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};