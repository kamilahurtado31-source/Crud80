const {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require = require('../models/usuariosService');

const idValido = (valor) => /^\d+$/.test(String(valor)) && Number(valor) > 0;

const listarController = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al listar usuarios', detalle: error.message });
    }
};


const crear = async (req, res) => {
    const { email, name, clave } = req.body || {};
    if (!email || typeof email !== 'string' || !clave || typeof clave !== 'string') {
        return res.status(400).json({ mensaje: 'Los campos email y clave son obligatorios y deben ser texto.' });
    }
    try {
        const userNew = await crearUsuario(email.trim(), name, clave);
        return res.status(201).json({ mensaje: 'Usuario creado', usuario: userNew });
    } catch (error) {
        if (error.code === 'P2002') return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email.' });
        return res.status(500).json({ mensaje: 'Error al crear usuario', detalle: error.message });
    }
};

const actualizarController = async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ mensaje: 'El id debe ser un número entero positivo.' });
    const { email, name, clave } = req.body || {};
    if (email === undefined && name === undefined && clave === undefined) {
        return res.status(400).json({ mensaje: 'Envía al menos uno de estos campos: email, name o clave.' });
    }
    if (email !== undefined && (typeof email !== 'string' || !email.trim())) return res.status(400).json({ mensaje: 'email debe ser texto no vacío.' });
    if (clave !== undefined && (typeof clave !== 'string' || !clave)) return res.status(400).json({ mensaje: 'clave debe ser texto no vacío.' });
    try {
        const usuario = await actualizarUsuario(Number(req.params.id), {
            ...(email !== undefined ? { email: email.trim() } : {}),
            ...(name !== undefined ? { name } : {}),
            ...(clave !== undefined ? { clave } : {})
        });
        return res.status(200).json({ mensaje: 'Usuario actualizado', usuario });
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        if (error.code === 'P2002') return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email.' });
        return res.status(500).json({ mensaje: 'Error al actualizar usuario', detalle: error.message });
    }
};

const eliminarController = async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ mensaje: 'El id debe ser un número entero positivo.' });
    try {
        const usuario = await eliminarUsuario(Number(req.params.id));
        return res.status(200).json({ mensaje: 'Usuario eliminado', usuario });
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        return res.status(500).json({ mensaje: 'Error al eliminar usuario', detalle: error.message });
    }
};

module.exports = { listarController, crear, actualizarController, eliminarController };