const Fabricante = require('../models/fabricante.model')
const Producto = require('../models/producto.model')
const Componente = require('../models/componente.model')

async function seedDatabase() {
    try {
        await Fabricante.deleteMany({})
        await Producto.deleteMany({})
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

        const productos = await Producto.insertMany([
            {
                nombre: 'Notebook Lenovo Ideapad B550',
                descripcion: 'Laptop Lenovo de 15.6" con procesador Intel Core i7 de 12ª generación, 16GB de RAM, y SSD de 480GB. Ideal para multitarea avanzada y rendimiento óptimo.',
                precio: '2900000',
                pathImg: 'ruta/a/la/imagen/'
            },
            {
                nombre: 'iPhone 14 Pro Max',
                descripcion: 'Smartphone de 6.7" con pantalla OLED, chip A16 Bionic, cámara triple de 48 MP, y 256 GB de almacenamiento.',
                precio: '1950000',
                pathImg: 'ruta/a/la/imagen/'
            },
            {
                nombre: 'Galaxy Tab S8+',
                descripcion: 'Tableta de 12.4" con pantalla Super AMOLED, procesador Snapdragon 8 Gen 1, 8 GB de RAM y 256 GB de almacenamiento.',
                precio: '3150000',
                pathImg: 'ruta/a/la/imagen/'
            }
        ])

        const componentes = await Componente.insertMany(
            [
                {
                    nombre: 'Procesador Intel Core i7 de 12ª generación',
                    descripcion: 'Procesador potente para tareas exigentes y rendimiento multitarea'
                },
                {
                    nombre: 'Memoria RAM de 16GB DDR4',
                    descripcion: 'Memoria rápida y eficiente que permite ejecutar múltiples aplicaciones sin interrupciones'
                },
                {
                    nombre: 'Chip A16 Bionic',
                    descripcion: 'Procesador de última generación diseñado por Apple, ofrece un rendimiento rápido y eficiente'
                },
                {
                    nombre: 'Pantalla Super Retina XDR',
                    descripcion: 'Pantalla OLED de 6.7 pulgadas con alta resolución y colores vibrantes'
                },
                {
                    nombre: 'Pantalla Super AMOLED de 12.4 pulgadas',
                    descripcion: 'Pantalla nítida y vibrante, ideal para ver contenido multimedia y trabajar con precisión'
                },
                {
                    nombre: 'Procesador Snapdragon 8 Gen 1',
                    descripcion: 'Procesador rápido y eficiente que permite realizar múltiples tareas sin problemas'
                }
            ])

            const relaciones = [
                {   
                    fabricante: fabricantes[0],
                    producto: productos[0], // Lenovo Notebook
                    componentes: [componentes[0], componentes[1]] 
                }, 
                { 
                    fabricante: fabricantes[1],
                    producto: productos[1], // iPhone 14 Pro Max
                    componentes: [componentes[2], componentes[3]]
                }, 
                { 
                    fabricante: fabricantes[2],
                    producto: productos[2], // Galaxy Tab S8+
                    componentes: [componentes[4], componentes[5]] 
                }  
            ];


            for (const { fabricante, producto, componentes } of relaciones) {
                fabricante.productos.push(producto._id);
                await fabricante.save();

                producto.fabricantes.push(fabricante._id);
                await producto.save();

                producto.componentes = componentes;  
                await producto.save();

                for (const componente of componentes) {
                    componente.productos.push(producto._id);
                    await componente.save(); 
                }
            }

        console.log('Base de datos poblada con éxito.')

    } catch(error) {
        console.log('Error al poblar la base de datos. ' + error)
    }
}

module.exports = seedDatabase