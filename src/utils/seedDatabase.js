const Fabricante = require('../models/fabricante.model')
const Componente = require('../models/componente.model')

async function seedDatabase() {
    try {
        await Fabricante.deleteMany({})
        await Componente.deleteMany({})

        const fabricantes = await Fabricante.insertMany([
            {
                nombre: 'Lenovo',
                direccion: 'Avenida del Libertador 7208',
                numeroContacto: '1145670933',
                pathImgPerfil: 'ruta/a/la/imagen/lenovo'
            },
            {
                nombre: 'Apple',
                direccion: '120 Bremner Blvd.',
                numeroContacto: '3438235091',
            },
            {
                nombre: 'Samsung',
                direccion: '2800 Market St, Irving',
                numeroContacto: '7684320063',
                pathImgPerfil: 'ruta/a/la/imagen/samsung'
            }
        ])

        const componentes = await Componente.insertMany(
            [
                {
                nombre: 'Componente 1',
                descripcion: 'Descripción del componente 1'
                },
                {
                nombre: 'Componente 2',
                descripcion: 'Descripción del componente 2'
                },
                {
                nombre: 'Componente 3',
                descripcion: 'Descripción del componente 3'
                }
            ])

        console.log('Base de datos poblada con éxito.')
    } catch(error) {
        console.log('Error al poblar la base de datos. ' + error)
    }
}

module.exports = seedDatabase