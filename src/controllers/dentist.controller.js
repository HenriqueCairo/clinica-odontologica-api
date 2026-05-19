const prisma = require('../lib/prisma');

async function listDentists(req, res) {
  try {
    const dentists = await prisma.dentist.findMany({
      include: {
        appointments: true
      }
    });

    return res.status(200).json(dentists);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar dentistas',
      error: error.message
    });
  }
}

async function getDentistById(req, res) {
  try {
    const { id } = req.params;

    const dentist = await prisma.dentist.findUnique({
      where: { id: Number(id) },
      include: {
        appointments: true
      }
    });

    if (!dentist) {
      return res.status(404).json({
        message: 'Dentista não encontrado'
      });
    }

    return res.status(200).json(dentist);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar dentista',
      error: error.message
    });
  }
}

async function createDentist(req, res) {
  try {
    const { name, specialty, cro } = req.body;

    if (!name || !specialty || !cro) {
      return res.status(400).json({
        message: 'Nome, especialidade e CRO são obrigatórios'
      });
    }

    const croExists = await prisma.dentist.findUnique({
      where: { cro }
    });

    if (croExists) {
      return res.status(409).json({
        message: 'CRO já cadastrado'
      });
    }

    const dentist = await prisma.dentist.create({
      data: {
        name,
        specialty,
        cro
      }
    });

    return res.status(201).json({
      message: 'Dentista criado com sucesso',
      dentist
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar dentista',
      error: error.message
    });
  }
}

async function updateDentist(req, res) {
  try {
    const { id } = req.params;
    const { name, specialty, cro } = req.body;

    const dentistExists = await prisma.dentist.findUnique({
      where: { id: Number(id) }
    });

    if (!dentistExists) {
      return res.status(404).json({
        message: 'Dentista não encontrado'
      });
    }

    const dentist = await prisma.dentist.update({
      where: { id: Number(id) },
      data: {
        name,
        specialty,
        cro
      }
    });

    return res.status(200).json({
      message: 'Dentista atualizado com sucesso',
      dentist
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar dentista',
      error: error.message
    });
  }
}

async function deleteDentist(req, res) {
  try {
    const { id } = req.params;

    const dentistExists = await prisma.dentist.findUnique({
      where: { id: Number(id) }
    });

    if (!dentistExists) {
      return res.status(404).json({
        message: 'Dentista não encontrado'
      });
    }

    await prisma.dentist.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({
      message: 'Dentista deletado com sucesso'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao deletar dentista',
      error: error.message
    });
  }
}

module.exports = {
  listDentists,
  getDentistById,
  createDentist,
  updateDentist,
  deleteDentist
};