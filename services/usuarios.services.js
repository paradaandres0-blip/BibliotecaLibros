const Usuario = require('../models/Usuarios');

exports.getAll = async () => {
    return await Usuario.findAll({
        order: [['id', 'ASC']]
    });
};

exports.getById = async (id) => {
    return await Usuario.findByPk(id);
};

exports.create = async (datos) => {
    return await Usuario.create(datos);
};

exports.update = async (id, datos) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    return await usuario.update(datos);
};

exports.delete = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    await usuario.destroy();
    return usuario;
};