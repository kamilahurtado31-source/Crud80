
    const datos = [
        { "id": 1, "nombre": "Laptop de segunda", "precio": 1200000 },
        { "id": 2, "nombre": "Mouse inalámbrico", "precio": 45000 }
    ];
const listar = async () => {
    //cosnulta a bd con await
    return datos;
};

module.exports = {listar};