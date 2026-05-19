const prisma = require('../lib/prisma');

async function listAppointments(req, res) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        dentist: true
      }
    });

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar consultas',
      error: error.message
    });
  }
}

async function getAppointmentById(req, res) {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        patient: true,
        dentist: true
      }
    });

    if (!appointment) {
      return res.status(404).json({
        message: 'Consulta não encontrada'
      });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar consulta',
      error: error.message
    });
  }
}

async function createAppointment(req, res) {
  try {
    const { date, patientId, dentistId } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        patientId: Number(patientId),
        dentistId: Number(dentistId)
      }
    });

    return res.status(201).json({
      message: 'Consulta criada com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar consulta',
      error: error.message
    });
  }
}

async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const { date, status } = req.body;

    const appointment = await prisma.appointment.update({
      where: {
        id: Number(id)
      },
      data: {
        date: new Date(date),
        status
      }
    });

    return res.status(200).json({
      message: 'Consulta atualizada com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar consulta',
      error: error.message
    });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: {
        id: Number(id)
      }
    });

    return res.status(200).json({
      message: 'Consulta deletada com sucesso'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao deletar consulta',
      error: error.message
    });
  }
}

module.exports = {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};