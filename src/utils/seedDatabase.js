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
                pathImgPerfil: 'https://res.cloudinary.com/dyyczibe4/image/upload/v1732708014/Logo_Lenovo_z5cib1.png'
            },
            {
                nombre: 'Samsung',
                direccion: '2800 Market St, Irving',
                numeroContacto: '7684320063',
                pathImgPerfil: 'https://res.cloudinary.com/dyyczibe4/image/upload/v1732708015/logo_samsung_ahqcke.png'
            }
        ]);

        const productos = await Producto.insertMany([
            {
                nombre: 'Lenovo ThinkPad X1 Carbon',
                descripcion: 'La Lenovo ThinkPad X1 Carbon es una obra maestra de ingeniería y diseño, pensada para los profesionales más exigentes. Esta ultrabook, con su chasis de fibra de carbono, combina durabilidad y ligereza en una estética sofisticada. Ideal para quienes buscan máxima productividad, la X1 Carbon ofrece una experiencia de usuario inigualable gracias a su pantalla de alta calidad y a su teclado ergonómico, que es un sello distintivo de la serie ThinkPad. Además, su diseño delgado y portátil asegura que puedas llevarla contigo a donde quiera que vayas, sin comprometer el rendimiento o la elegancia.',
                precio: 3200000,
                pathImg: 'https://res.cloudinary.com/debbwe3rs/image/upload/v1732664975/notebook-lenovo-2_st9xzz.jpg',
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
                descripcion: 'La Lenovo IdeaPad 3 es una notebook diseñada para quienes buscan un equilibrio perfecto entre funcionalidad y estilo. Su diseño elegante y moderno la convierte en una compañera ideal para el trabajo, los estudios o el entretenimiento. Ligera y portátil, esta notebook es fácil de llevar a cualquier lugar, asegurando que siempre puedas estar conectado y productivo. Con una pantalla de alta calidad y características intuitivas, la IdeaPad 3 ofrece una experiencia de usuario fluida y agradable. Es la elección perfecta para quienes valoran la eficiencia y la practicidad en su vida diaria.',
                precio: 2500000,
                pathImg: 'https://res.cloudinary.com/debbwe3rs/image/upload/v1732664975/notebook-lenovo-1_slb79y.jpg',
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
                descripcion: 'La Samsung Galaxy Book Flex combina estilo, innovación y funcionalidad en un solo dispositivo. Este ultrabook destaca por su diseño delgado y elegante, perfecto para aquellos que buscan un equipo portátil sin comprometer el rendimiento. La bisagra 360 grados permite utilizarla como laptop o tableta, brindando una versatilidad excepcional. Además, cuenta con una pantalla QLED de alta calidad que ofrece colores vibrantes y una experiencia visual impresionante. Ideal para profesionales y estudiantes, la Galaxy Book Flex es la compañera perfecta para cualquier tarea, ya sea en la oficina, en casa o en movimiento.',
                precio: 2800000,
                pathImg: 'https://res.cloudinary.com/debbwe3rs/image/upload/v1732664975/notebook-samsung-2_gircjz.jpg',
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
                descripcion: 'La Samsung Notebook Odyssey es la elección perfecta para los apasionados del gaming y los profesionales que buscan alto rendimiento. Su diseño robusto y moderno, combinado con detalles llamativos, la convierten en una máquina imponente tanto en apariencia como en funcionalidad. Con una pantalla de alta calidad, asegura una experiencia visual inmersiva, ideal para juegos y trabajos gráficos intensivos. Además, su sistema de refrigeración avanzado mantiene el rendimiento óptimo incluso durante las sesiones más exigentes. La Notebook Odyssey es más que una laptop, es una puerta a nuevos mundos de entretenimiento y productividad.',
                precio: 4000000,
                pathImg: 'https://res.cloudinary.com/debbwe3rs/image/upload/v1732664975/notebook-samsung-1_cjypmk.jpg',
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