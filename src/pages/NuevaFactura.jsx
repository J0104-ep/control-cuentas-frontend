import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevaFactura.css";

function NuevaFactura() {

    const navigate = useNavigate();

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

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
    }, []);

    // ===============================
    // CARGAR CLIENTES
    // ===============================
    const cargarClientes = async () => {

        try {

            const respuesta = await api.get("/clientes");

            setClientes(respuesta.data);

        } catch (error) {

            console.error("Error cargando clientes:", error);

        }

    };

    // ===============================
    // CAMBIAR CAMPOS
    // ===============================
    const cambiarCampo = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });

    };

    // ===============================
    // SELECCIONAR IMAGEN
    // ===============================
    const seleccionarImagen = (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;

        setImagen(archivo);

        setVistaPrevia(
            URL.createObjectURL(archivo)
        );

    };

    // ===============================
    // GUARDAR FACTURA
    // ===============================
    const guardarFactura = async (e) => {

        e.preventDefault();

        try {

            if (!usuario) {

                alert("Debe iniciar sesión");

                navigate("/login");
                return;

            }

            const datos = new FormData();

            datos.append("cliente_id", formulario.cliente_id);
            datos.append("usuario_id", usuario.id);
            datos.append("valor", formulario.valor);
            datos.append("estado_pago", formulario.estado_pago);

            if (imagen) {
                datos.append("imagen", imagen);
            }

            await api.post(
                "/facturas",
                datos,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Factura creada correctamente");

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Error creando factura:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.mensaje ||
                "Error creando factura"
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

                <h1>🧾 Nueva Factura</h1>

                <form onSubmit={guardarFactura}>

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

                        <label>Valor factura</label>

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
                            type="submit"
                            className="btn-guardar"
                        >
                            💾 Guardar Factura
                        </button>

                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default NuevaFactura;