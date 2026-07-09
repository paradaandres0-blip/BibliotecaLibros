const { Prestamo, Usuario, Libro } = require('../models');
const { col } = require('sequelize');

exports.getAll = async () => {
    return await Prestamo.findAll({
        attributes: [
            'id',
            'fecha_prestamo',
            'fecha_devolucion',
            [col('Usuario.nombre'), 'usuario'],
            [col('Libro.titulo'), 'libro']
        ],
        include: [
            { model: Usuario, attributes: [] },
            { model: Libro, attributes: [] }
        ],
        raw: true
    });
};

exports.getById = async (id) => {
    return await Prestamo.findByPk(id, {
        attributes: [
            'id',
            'fecha_prestamo',
            'fecha_devolucion',
            [col('Usuario.nombre'), 'usuario'],
            [col('Libro.titulo'), 'libro']
        ],
        include: [
            { model: Usuario, attributes: [] },
            { model: Libro, attributes: [] }
        ],
        raw: true
    });
};

exports.create = async (prestamo) => {
    const usuario = await Usuario.findByPk(prestamo.usuario_id);
    if (!usuario) {
        throw new Error('El usuario no existe');
    }
    const libro = await Libro.findByPk(prestamo.libro_id);
    if (!libro) {
        throw new Error('El libro no existe');
    }
    const prestamoActivo = await Prestamo.findOne({
        where: {
            libro_id: prestamo.libro_id,
            fecha_devolucion: null
        }
    });
    if (prestamoActivo) {
        throw new Error('El libro está prestado');
    }
    return await Prestamo.create({
        usuario_id: prestamo.usuario_id,
        libro_id: prestamo.libro_id,
        fecha_prestamo: new Date()
    });
};

exports.devolucion = async (id) => {
    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) {
        throw new Error('El préstamo no existe');
    }
    if (prestamo.fecha_devolucion) {
        throw new Error('El préstamo ya fue devuelto');
    }
    return await prestamo.update({
        fecha_devolucion: new Date()
    });
};