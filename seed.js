import * as ProductService from './src/services/products.services.js';

const initialProducts = [
    { name: "Placa de Video RTX 3060", price: 450000, category: "hardware", stock: 5, description: "Placa de video de alta gama" },
    { name: "Monitor 24'", price: 180000, category: "monitores", stock: 7, description: "Monitor IPS 144Hz" },
    { name: "Auriculares 7.1", price: 35000, category: "audio", stock: 10, description: "Sonido envolvente" },
    { name: "Parlantes 2.1 Bluetooth", price: 28000, category: "audio", stock: 7, description: "Sistema de audio inalámbrico" },
    { name: "Teclado Mecánico RGB", price: 45000, category: "perifericos", stock: 11, description: "Teclado gamer con switches azules" },
    { name: "Silla Gamer Ergonómica", price: 120000, category: "muebles", stock: 3, description: "Silla con soporte lumbar y cervical" },
    { name: "Webcam Full HD 1080p", price: 35000, category: "perifericos", stock: 17, description: "Webcam con micrófono integrado" },
    { name: "Procesador Intel i7", price: 380000, category: "hardware", stock: 8, description: "Procesador de 12va generación" },
    { name: "Mouse Gamer", price: 25000, category: "perifericos", stock: 12, description: "Mouse óptico 16000 DPI" },
    { name: "Fuente de Poder 750W", price: 85000, category: "hardware", stock: 14, description: "Fuente modular certificada 80 Plus" },
    { name: "Gabinete ATX Vidrio", price: 55000, category: "hardware", stock: 9, description: "Gabinete con panel lateral de vidrio templado" },
    { name: "Disco SSD 1TB NVMe", price: 65000, category: "hardware", stock: 19, description: "Almacenamiento ultra rápido" },
    { name: "Router WiFi 6", price: 42000, category: "redes", stock: 16, description: "Router de alta velocidad" },
    { name: "Micrófono Condensador", price: 48000, category: "audio", stock: 8, description: "Micrófono ideal para streaming" },
    { name: "Memoria RAM 16GB DDR5", price: 75000, category: "hardware", stock: 22, description: "Módulo de alta frecuencia para gaming" },
    { name: "Monitor Curvo 27'", price: 290000, category: "monitores", stock: 4, description: "Pantalla 165Hz con panel VA" },
    { name: "Water Cooling 240mm", price: 110000, category: "hardware", stock: 6, description: "Sistema de refrigeración líquida ARGB" },
    { name: "Mousepad XL Extendido", price: 18000, category: "perifericos", stock: 25, description: "Superficie de tela de alta precisión" },
    { name: "Placa Madre B650 AM5", price: 195000, category: "hardware", stock: 8, description: "Motherboard compatible con Ryzen serie 7000" },
    { name: "Hub USB-C 4 en 1", price: 22000, category: "perifericos", stock: 15, description: "Adaptador con puertos USB 3.0 y HDMI" }
];

const seed = async () => {
    console.log("Iniciando carga de productos...");
    try {
        for (const product of initialProducts) {
            const created = await ProductService.createProduct(product);
            console.log(`✅ Producto creado: ${created.name} con ID: ${created.id}`);
        }
        console.log("Proceso terminado con éxito");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error en la carga:", error.message);
        process.exit(1);
    }
};

seed();