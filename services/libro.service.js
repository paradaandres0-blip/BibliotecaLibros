const Libro = require('../models/Libro');

exports.getAll = async () => {
    return await Libro.findAll({
        order: [['id', 'ASC']]
    });
};

exports.getById = async (id) => {
    return await Libro.findByPk(id);
};

exports.create = async (libro) => {
    return await Libro.create(libro);
};

exports.update = async (id, datos) => {
    const libro = await Libro.findByPk(id);
    if (!libro) {
        return null;
    }
    return await libro.update(datos);
};

exports.delete = async (id) => {
    const libro = await Libro.findByPk(id);
    if (!libro) {
        return null;
    }
    await libro.destroy();
    return libro;
};