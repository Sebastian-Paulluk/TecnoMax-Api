const Fabricante = require('../models/fabricante.model')
const Producto = require('../models/producto.model')

async function seedDatabase() {
    try {
        await Fabricante.deleteMany({})
        await Producto.deleteMany({})

        const fabricantes = await Fabricante.insertMany([
            {
                nombre: 'Lenovo',
                direccion: 'Avenida del Libertador 7208',
                numeroContacto: '1145670933',
                pathImgPerfil: 'ruta/a/la/imagen/lenovo'
            },
            {
                nombre: 'Samsung',
                direccion: '2800 Market St, Irving',
                numeroContacto: '7684320063',
                pathImgPerfil: 'ruta/a/la/imagen/samsung'
            }
        ]);

        const productos = await Producto.insertMany([
            {
                nombre: 'Lenovo ThinkPad X1 Carbon',
                descripcion: 'Notebook Lenovo de 14" con procesador Intel Core i7, 16GB RAM y SSD de 512GB.',
                precio: 3200000,
                pathImg: 'ruta/a/la/imagen/lenovo1.jpg',
                fabricantes: [fabricantes[0]._id],
                componentes: [
                    { nombre: 'Motherboard Intel', descripcion: 'Placa base compatible con procesadores Intel de última generación' },
                    { nombre: 'Microprocesador Intel Core i7', descripcion: 'Procesador Intel de alto rendimiento para tareas multitarea' },
                    { nombre: 'Memoria RAM 16GB DDR4', descripcion: 'Memoria rápida para multitarea y alto rendimiento' },
                    { nombre: 'SSD 512GB', descripcion: 'Unidad de estado sólido para almacenamiento rápido' },
                    { nombre: 'Pantalla 14" FHD', descripcion: 'Pantalla de alta resolución, ideal para trabajo y entretenimiento' }
                ]
            },
            {
                nombre: 'Lenovo Ideapad 3',
                descripcion: 'Notebook Lenovo de 15.6" con procesador AMD Ryzen 5, 8GB RAM y SSD de 256GB.',
                precio: 2500000,
                pathImg: 'ruta/a/la/imagen/lenovo2.jpg',
                fabricantes: [fabricantes[0]._id],
                componentes: [
                    { nombre: 'Motherboard AMD', descripcion: 'Placa base compatible con procesadores AMD Ryzen' },
                    { nombre: 'Microprocesador AMD Ryzen 5', descripcion: 'Procesador AMD para rendimiento eficiente' },
                    { nombre: 'Memoria RAM 8GB DDR4', descripcion: 'Memoria rápida para tareas cotidianas y aplicaciones de oficina' },
                    { nombre: 'SSD 256GB', descripcion: 'Unidad de estado sólido para almacenamiento eficiente' },
                    { nombre: 'Pantalla 15.6" HD', descripcion: 'Pantalla HD para una visualización clara y precisa' }
                ]
            },
            {
                nombre: 'Samsung Galaxy Book Flex',
                descripcion: 'Notebook Samsung de 13.3" con Intel Core i5, 8GB RAM y SSD de 256GB.',
                precio: 2800000,
                pathImg: 'ruta/a/la/imagen/samsung1.jpg',
                fabricantes: [fabricantes[1]._id],
                componentes: [
                    { nombre: 'Motherboard Intel', descripcion: 'Placa base compatible con procesadores Intel de última generación' },
                    { nombre: 'Microprocesador Intel Core i7', descripcion: 'Procesador Intel de alto rendimiento para tareas multitarea' },
                    { nombre: 'Memoria RAM 16GB DDR4', descripcion: 'Memoria rápida para multitarea y alto rendimiento' },
                    { nombre: 'SSD 256GB', descripcion: 'Unidad de estado sólido para almacenamiento eficiente' },
                    { nombre: 'Pantalla 14" FHD', descripcion: 'Pantalla de alta resolución, ideal para trabajo y entretenimiento' }
                ]
            },
            {
                nombre: 'Samsung Notebook Odyssey',
                descripcion: 'Notebook Samsung de 15.6" con Intel Core i7, 16GB RAM y SSD de 1TB.',
                precio: 4000000,
                pathImg: 'ruta/a/la/imagen/samsung2.jpg',
                fabricantes: [fabricantes[1]._id],
                componentes: [
                    { nombre: 'Motherboard Intel', descripcion: 'Placa base compatible con procesadores Intel de última generación' },
                    { nombre: 'Microprocesador Intel Core i7', descripcion: 'Procesador Intel de alto rendimiento para tareas multitarea' },
                    { nombre: 'Memoria RAM 16GB DDR4', descripcion: 'Memoria rápida para multitarea y alto rendimiento' },
                    { nombre: 'SSD 512GB', descripcion: 'Unidad de estado sólido para almacenamiento rápido' },
                    { nombre: 'Pantalla 15.6" HD', descripcion: 'Pantalla HD para una visualización clara y precisa' }
                ]
            }
        ]);

        fabricantes[0].productos.push(productos[0]._id)
        fabricantes[0].productos.push(productos[1]._id)
        fabricantes[1].productos.push(productos[2]._id)
        fabricantes[1].productos.push(productos[3]._id)
        await fabricantes[0].save()
        await fabricantes[1].save()

        console.log('Base de datos poblada con éxito.')

    } catch(error) {
        console.log('Error al poblar la base de datos. ' + error)
    }
}

module.exports = seedDatabase