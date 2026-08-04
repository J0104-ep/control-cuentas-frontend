import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevaFactura.css";

function EditarFactura() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [formulario, setFormulario] = useState({
        cliente_id: "",
        valor: "",
        estado_pago: "pendiente"
    });

    const [imagen, setImagen] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState(null);

    useEffect(() => {
        cargarClientes();
        cargarFactura();
    }, [id]);

    // ============================
    // CARGAR CLIENTES
    // ============================

    const cargarClientes = async () => {

        try {

            const respuesta = await api.get("/clientes");

            setClientes(respuesta.data);

        } catch (error) {

            console.error("Error cargando clientes", error);

        }

    };

    // ============================
    // CARGAR FACTURA
    // ============================

    const cargarFactura = async () => {

        try {

            const respuesta = await api.get(`/facturas/${id}`);

            const factura = respuesta.data;

            console.log("Factura cargada:", factura);

            setFormulario({
                cliente_id: factura.cliente_id,
                valor: factura.valor,
                estado_pago: factura.estado_pago || "pendiente"
            });

            if (factura.foto_url) {
                setVistaPrevia(factura.foto_url);
            }

        } catch (error) {

            console.error("Error cargando factura", error);

        }

    };

    // ============================
    // CAMBIAR CAMPOS
    // ============================

    const cambiarCampo = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });

    };

    // ============================
    // IMAGEN
    // ============================

    const seleccionarImagen = (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;

        setImagen(archivo);

        setVistaPrevia(
            URL.createObjectURL(archivo)
        );

    };

    // ============================
    // ACTUALIZAR
    // ============================

    const actualizarFactura = async (e) => {

        e.preventDefault();

        try {

            const datos = new FormData();

            datos.append("cliente_id", formulario.cliente_id);
            datos.append("valor", formulario.valor);
            datos.append("estado_pago", formulario.estado_pago);

            if (imagen) {
                datos.append("imagen", imagen);
            }

            console.log("Estado enviado:", formulario.estado_pago);

            await api.put(
                `/facturas/${id}`,
                datos,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Factura actualizada correctamente");

            navigate("/facturas");

        } catch (error) {

            console.error(
                "Error actualizando factura:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.mensaje ||
                "Error actualizando factura"
            );

        }

    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (

        <div className="factura-container">

            <div className="factura-card">

                <h1>✏ Editar Factura</h1>

                <form onSubmit={actualizarFactura}>

                    <div className="form-grupo">

                        <label>Buscar cliente</label>

                        <input
                            type="text"
                            placeholder="🔎 Buscar cliente..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />

                        <select
                            name="cliente_id"
                            value={formulario.cliente_id}
                            onChange={cambiarCampo}
                            required
                        >

                            <option value="">
                                Seleccione cliente
                            </option>

                            {clientesFiltrados.map(cliente => (

                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nombre}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-grupo">

                        <label>Valor</label>

                        <input
                            type="number"
                            name="valor"
                            value={formulario.valor}
                            onChange={cambiarCampo}
                            required
                        />

                    </div>

                    <div className="form-grupo">

                        <label>Estado de pago</label>

                        <select
                            name="estado_pago"
                            value={formulario.estado_pago}
                            onChange={cambiarCampo}
                            required
                        >

                            <option value="pendiente">
                                Pendiente
                            </option>

                            <option value="pagada">
                                Pagada
                            </option>

                        </select>

                    </div>

                    <div className="form-grupo">

                        <label>Imagen factura</label>

                        <div className="opciones-imagen">

                            <label className="btn-imagen">

                                📷 Tomar foto

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={seleccionarImagen}
                                />

                            </label>

                            <label className="btn-imagen">

                                🖼️ Galería

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={seleccionarImagen}
                                />

                            </label>

                        </div>

                    </div>

                    {vistaPrevia && (

                        <img
                            src={vistaPrevia}
                            alt="Factura"
                            className="preview-factura"
                        />

                    )}

                    <div className="botones">

                        <button
                            className="btn-guardar"
                            type="submit"
                        >
                            💾 Guardar Cambios
                        </button>

                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={() => navigate("/facturas")}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditarFactura;