import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/tiendas.css";

function Tiendas() {

  const navigate = useNavigate();

  const [tiendas, setTiendas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargarTiendas = async () => {

    try {

      const respuesta = await api.get("/clientes");

      setTiendas(respuesta.data);

    } catch (error) {

      console.error("Error cargando tiendas:", error);

    }

  };

  useEffect(() => {

    cargarTiendas();

  }, []);

  const eliminarTienda = async (id) => {

    const confirmar = window.confirm(
      "¿Desea eliminar esta tienda?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/clientes/${id}`);

      cargarTiendas();

      alert("Tienda eliminada correctamente");

    } catch (error) {

      console.error(error);

      alert("No fue posible eliminar la tienda");

    }

  };

  const tiendasFiltradas = tiendas.filter((tienda) =>

    tienda.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

  );

  return (

    <div className="tiendas-container">

      <div className="tiendas-card">

        <h1>
          🏪 Gestión de Tiendas
        </h1>

        <div className="buscar-tienda">

          <input
            type="text"
            placeholder="🔎 Buscar tienda..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />

        </div>

        {

          tiendasFiltradas.length === 0 ? (

            <div className="sin-tiendas">

              No hay tiendas registradas.

            </div>

          ) : (

            tiendasFiltradas.map((tienda) => (

              <div
                className="tienda-item"
                key={tienda.id}
              >

                <div className="info-tienda">

                  <h3>

                    {tienda.nombre}

                  </h3>

                  <p>

                    <strong>Teléfono:</strong>{" "}
                    {tienda.telefono || "No registrado"}

                  </p>

                  <p>

                    <strong>Dirección:</strong>{" "}
                    {tienda.direccion || "No registrada"}

                  </p>

                </div>

                <div className="acciones-tienda">

                  <button
                    className="editar"
                    onClick={() =>
                      navigate(`/editar-tienda/${tienda.id}`)
                    }
                  >
                    ✏ Editar
                  </button>

                  <button
                    className="eliminar"
                    onClick={() =>
                      eliminarTienda(tienda.id)
                    }
                  >
                    🗑 Eliminar
                  </button>

                </div>

              </div>

            ))

          )

        }

        <div className="botones-inferiores">

          <button
            className="btn-nueva"
            onClick={() =>
              navigate("/nueva-tienda")
            }
          >
            ➕ Nueva Tienda
          </button>

          <button
            className="btn-volver"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ⬅ Volver
          </button>

        </div>

      </div>

    </div>

  );

}

export default Tiendas;