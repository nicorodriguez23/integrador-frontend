import { useParams } from "react-router-dom";
import tarjetaGrafica from "../../assets/images/tarjeta-grafica.png";
import intelI9 from "../../assets/images/intel-i9.png";
import ramCorsair from "../../assets/images/ram.png";
import placaBase from "../../assets/images/placa.png";
import ssdSamsung from "../../assets/images/ssd-samsung.png";
import fuenteEVGA from "../../assets/images/fuente.png";
import tecladoCorsair from "../../assets/images/teclado.png";
import auricularesSteelSeries from "../../assets/images/auriculares.png";
import monitorAcer from "../../assets/images/monitor.png";
import "../../styles/DetalleProducto.css";


const productosData = {
  1: {
    nombre: "Tarjeta Gráfica RTX 4090",
    precio: 1999.99,
    descripcion: "La NVIDIA GeForce RTX 4090 es la GPU más potente de la serie 40, con tecnología Ada Lovelace. Ofrece un rendimiento increíble en juegos y creación de contenido.",
    especificaciones: [
      "Arquitectura: Ada Lovelace",
      "Memoria: 24GB GDDR6X",
      "Núcleos CUDA: 16,384",
      "Consumo: 450W",
      "Puertos: HDMI 2.1, DisplayPort 1.4a"
    ],
    imagen: tarjetaGrafica,
  },
  2: {
    nombre: "Procesador Intel i9-13900K",
    precio: 649.99,
    descripcion: "Procesador Intel Core i9-13900K de 13ª generación con 24 núcleos y rendimiento extremo para gaming y productividad.",
    especificaciones: [
      "Núcleos: 24 (8 Performance + 16 Efficiency)",
      "Velocidad Turbo: Hasta 5.8 GHz",
      "Caché: 36 MB Intel Smart Cache",
      "Socket: LGA1700"
    ],
    imagen: intelI9,
  },
  3: {
    nombre: "Memoria RAM Corsair Vengeance",
    precio: 129.99,
    descripcion: "Memoria RAM DDR4 Corsair Vengeance de alta velocidad para un rendimiento óptimo en juegos y multitarea.",
    especificaciones: [
      "Capacidad: 16GB (2x8GB)",
      "Frecuencia: 3200 MHz",
      "Latencia: CL16",
      "Voltaje: 1.35V"
    ],
    imagen: ramCorsair,
  },
  4: {
    nombre: "Placa Base ASUS ROG Strix",
    precio: 299.99,
    descripcion: "Placa base para gamers con soporte para overclocking y RGB personalizable.",
    especificaciones: [
      "Socket: AM4",
      "Chipset: X570",
      "Memoria: DDR4 hasta 128GB",
      "Puertos: USB 3.2, HDMI, DisplayPort"
    ],
    imagen: placaBase,
  },
  5: {
    nombre: "SSD Samsung 970 EVO 1TB",
    precio: 169.99,
    descripcion: "Unidad de estado sólido NVMe Samsung 970 EVO de 1TB, alta velocidad para cargas y transferencias rápidas.",
    especificaciones: [
      "Capacidad: 1TB",
      "Interfaz: NVMe PCIe Gen 3.0 x4",
      "Velocidad lectura: Hasta 3500 MB/s",
      "Velocidad escritura: Hasta 3300 MB/s"
    ],
    imagen: ssdSamsung,
  },
  6: {
    nombre: "Fuente de Poder EVGA 750W",
    precio: 129.99,
    descripcion: "Fuente de poder EVGA de 750W con certificación 80 Plus Gold para eficiencia y estabilidad en tu PC gamer.",
    especificaciones: [
      "Potencia: 750W",
      "Certificación: 80 Plus Gold",
      "Modular: Sí",
      "Ventilador: Silencioso"
    ],
    imagen: fuenteEVGA,
  },
  7: {
    nombre: "Teclado Mecánico Corsair K70",
    precio: 149.99,
    descripcion: "Teclado mecánico Corsair K70 con switches Cherry MX, retroiluminación RGB y diseño para gaming profesional.",
    especificaciones: [
      "Switches: Cherry MX",
      "Retroiluminación: RGB",
      "Anti-ghosting: N-Key rollover",
      "Construcción: Aluminio"
    ],
    imagen: tecladoCorsair,
  },
  8: {
    nombre: "Auriculares SteelSeries Arctis 7",
    precio: 179.99,
    descripcion: "Auriculares inalámbricos SteelSeries Arctis 7 con sonido envolvente, micrófono ClearCast y confort para largas sesiones.",
    especificaciones: [
      "Conectividad: Inalámbrica",
      "Batería: Hasta 24 horas",
      "Micrófono: Retráctil",
      "Sonido: DTS Headphone:X"
    ],
    imagen: auricularesSteelSeries,
  },
  9: {
    nombre: "Monitor Acer Predator 27\"",
    precio: 399.99,
    descripcion: "Monitor gamer Acer Predator de 27 pulgadas con alta frecuencia de actualización y tecnología G-Sync.",
    especificaciones: [
      "Tamaño: 27 pulgadas",
      "Resolución: 2560x1440 QHD",
      "Frecuencia: 165Hz",
      "Tecnología: NVIDIA G-Sync",
      "Tiempo de respuesta: 1ms"
    ],
    imagen: monitorAcer,
  }
};

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = productosData[parseInt(id)];

  if (!producto) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</h2>;
  }

  return (
    <>
      <header className="header">
        <h1 className="titulo-detalle">{producto.nombre}</h1>
      </header>

      <main className="detalle-producto">
        <div className="producto-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="producto-info">
          <h2 className="precio">${producto.precio.toFixed(2)}</h2>
          <p className="descripcion">{producto.descripcion}</p>
          <ul className="especificaciones">
            {producto.especificaciones.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <button className="btn-agregar">Agregar al Carrito</button>
        </div>
      </main>
    </>
  );
}
