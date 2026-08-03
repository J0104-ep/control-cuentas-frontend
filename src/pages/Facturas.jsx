import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/facturas.css";


function Facturas() {


  const navigate = useNavigate();


  const [facturas,setFacturas] = useState([]);

  const [busqueda,setBusqueda] = useState("");



  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  ) || {};






  const cargarFacturas = async()=>{


    try{


      const respuesta = await api.get(
        "/facturas",
        {
          params:{
            usuario_id:usuario.id,
            rol:usuario.rol
          }
        }
      );



      setFacturas(
        respuesta.data
      );



    }catch(error){


      console.error(
        "Error cargando facturas:",
        error
      );


    }


  };







  useEffect(()=>{


    cargarFacturas();


  },[]);








  const eliminarFactura = async(id)=>{


    const confirmar = window.confirm(
      "¿Desea eliminar esta factura?"
    );


    if(!confirmar)
      return;




    try{


      await api.delete(
        `/facturas/${id}`,
        {
          params:{
            rol:usuario.rol
          }
        }
      );



      alert(
        "Factura eliminada correctamente"
      );



      cargarFacturas();



    }catch(error){



      console.error(error);



      alert(
        error.response?.data?.mensaje ||
        "No fue posible eliminar la factura"
      );



    }


  };









  const facturasFiltradas = facturas.filter(
    (factura)=>{


      const cliente =
      factura.clientes?.nombre
      ?.toLowerCase() || "";



      return cliente.includes(
        busqueda.toLowerCase()
      );


    }
  );








  return(


    <div className="facturas-container">


      <div className="facturas-card">



        <h1>
          🧾 Facturas Registradas
        </h1>





        <div className="buscar-factura">


          <input

            type="text"

            placeholder="🔎 Buscar cliente..."

            value={busqueda}

            onChange={(e)=>
              setBusqueda(e.target.value)
            }

          />


        </div>









        {
          facturasFiltradas.length===0 ? (


            <div className="sin-facturas">

              No hay facturas registradas.

            </div>



          ):(



            facturasFiltradas.map((factura)=>(



              <div

                className="factura-item"

                key={factura.id}

              >




                <div className="info-factura">


                  <h3>

                    Factura #
                    {
                      String(factura.id)
                      .substring(0,8)
                    }

                  </h3>





                  <p>

                    <strong>
                      Cliente:
                    </strong>{" "}

                    {
                      factura.clientes?.nombre ||
                      "Sin cliente"
                    }


                  </p>







                  <p>

                    <strong>
                      Subida por:
                    </strong>{" "}

                    {
                      factura.usuarios?.nombre ||
                      "Sin usuario"
                    }


                  </p>








                  <p>

                    <strong>
                      Fecha:
                    </strong>{" "}

                    {factura.fecha}


                  </p>







                  <p>

                    <strong>
                      Hora:
                    </strong>{" "}

                    {
                      factura.hora
                      ?
                      factura.hora.substring(0,5)
                      :
                      "--:--"
                    }


                  </p>







                  <p className="valor">


                    $

                    {
                      Number(
                        factura.valor
                      )
                      .toLocaleString("es-CO")
                    }


                  </p>




                </div>









                <div className="acciones-factura">






                  {
                    factura.foto_url && (


                      <a

                        href={factura.foto_url}

                        target="_blank"

                        rel="noreferrer"

                      >

                        📷 Ver imagen


                      </a>


                    )
                  }









                  {
                    usuario.rol === "jefe" && (



                      <>


                        <button

                          className="editar"

                          onClick={()=>


                            navigate(
                              `/editar-factura/${factura.id}`
                            )


                          }

                        >

                          ✏ Editar


                        </button>







                        <button

                          className="eliminar"

                          onClick={()=>


                            eliminarFactura(
                              factura.id
                            )


                          }

                        >

                          🗑 Eliminar


                        </button>



                      </>


                    )

                  }







                </div>





              </div>



            ))


          )

        }









        <div className="botones-inferiores">



          <button

            className="btn-nueva"

            onClick={()=>
              navigate("/nueva-factura")
            }

          >

            ➕ Nueva Factura


          </button>







          <button

            className="btn-volver"

            onClick={()=>


              navigate(
                usuario.rol === "jefe"
                ?
                "/dashboard"
                :
                "/dashboard-trabajador"
              )


            }

          >

            ⬅ Volver


          </button>





        </div>





      </div>


    </div>


  );


}



export default Facturas;