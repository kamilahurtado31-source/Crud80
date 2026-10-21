const ormPrisma = require("../config/conexion");

const listarUsuarios = async () => {
    return await ormPrisma.usuarios.findMany({
        select: { id: true, email: true, name: true }
    });
};

const crearUsuario = async (email, name, clave) => {
    return await ormPrisma.usuarios.create({
        data: { email, name: name || null, clave },
        select: { id: true, email: true, name: true }
    });
};

const actualizarUsuario = async (id, datos) => {
    const data = {};
    if (datos.email !== undefined) data.email = datos.email;
    if (datos.name !== undefined) data.name = datos.name;
    if (datos.clave !== undefined) data.clave = datos.clave;

    return await ormPrisma.usuarios.update({
        where: { id }, data,
        select: { id: true, email: true, name: true }
    });
};

const eliminarUsuario = async (id) => {
    return await ormPrisma.usuarios.delete({
        where: { id },
        select: { id: true, email: true, name: true }
    });
};

module.exports = {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};