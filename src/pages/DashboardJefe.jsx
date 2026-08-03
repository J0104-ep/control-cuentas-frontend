import { 
  useEffect, 
  useState 
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import "./../styles/dashboard.css";



function DashboardJefe(){


  const navigate = useNavigate();



  const [menuAbierto,setMenuAbierto] = useState(false);



  const hoy = new Date().toLocaleDateString(
    "es-CO",
    {
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric"
    }
  );





  const [datos,setDatos] = useState({

    totalVentas:0,

    totalClientes:0,

    totalTrabajadores:0,

    totalFacturas:0,

    ultimasFacturas:[]

  });







  useEffect(()=>{


    const cargarDashboard = async()=>{


      try{


        const respuesta = await api.get(
          "/dashboard"
        );


        setDatos(
          respuesta.data
        );


      }catch(error){


        console.error(
          "Error cargando dashboard:",
          error
        );


      }


    };



    cargarDashboard();



  },[]);








  const cerrarSesion = ()=>{


    localStorage.removeItem("usuario");

    localStorage.removeItem("usuario_id");

    localStorage.removeItem("usuario_nombre");

    localStorage.removeItem("usuario_rol");

    localStorage.removeItem("sesion");


    navigate("/login");


  };







  return(


    <div className="dashboard">





      {/* BOTON MENU CELULAR */}


      <button

        className="menu-mobile"

        onClick={()=>setMenuAbierto(true)}

      >

        ☰

      </button>








      {/* FONDO OSCURO CUANDO MENU ABIERTO */}


      {
        menuAbierto && (

          <div

            className="overlay"

            onClick={()=>setMenuAbierto(false)}

          >

          </div>

        )
      }








      {/* SIDEBAR */}



      <aside

        className={
          menuAbierto
          ?
          "sidebar activo-menu"
          :
          "sidebar"
        }

      >




        <div className="cerrar-menu">


          <button

            onClick={()=>setMenuAbierto(false)}

          >

            ✖

          </button>


        </div>






        <div className="logo">


          <h2>

            CONTROL

          </h2>


          <span>

            CUENTAS

          </span>


        </div>







        <nav>


          <ul>



            <li

              className="active"

              onClick={()=>{

                navigate("/dashboard");

                setMenuAbierto(false);

              }}

            >

              🏠 Inicio

            </li>





            <li

              onClick={()=>{

                navigate("/tiendas");

                setMenuAbierto(false);

              }}

            >

              🏪 Tiendas

            </li>





            <li

              onClick={()=>{

                navigate("/facturas");

                setMenuAbierto(false);

              }}

            >

              🧾 Facturas

            </li>





            <li

              onClick={()=>{

                navigate("/trabajadores");

                setMenuAbierto(false);

              }}

            >

              👷 Trabajadores

            </li>





            <li

              onClick={cerrarSesion}

            >

              🚪 Cerrar sesión

            </li>





          </ul>



        </nav>




      </aside>







      {/* CONTENIDO PRINCIPAL */}



      <main className="content">





        <div className="topbar">



          <div>


            <h1>

              Inicio

            </h1>



            <p>

              Bienvenido{" "}

              {
                JSON.parse(
                  localStorage.getItem("usuario")
                )?.nombre
              }


            </p>


          </div>





          <div className="fecha">


            {hoy}


          </div>





        </div>






        <div className="total-card">


          <h3>

            💰 Total vendido hoy

          </h3>




          <h1>


            $

            {
              Number(
                datos.totalVentas
              )
              .toLocaleString("es-CO")
            }


          </h1>




          <p>

            Ventas registradas durante el día.

          </p>



        </div>
        



        {/* CREAR NUEVOS */}


        <div className="acciones">



          <button

            onClick={()=>navigate("/nueva-tienda")}

          >

            🏪 Nueva Tienda

          </button>





          <button

            onClick={()=>navigate("/nueva-factura")}

          >

            🧾 Nueva Factura

          </button>



        </div>









        {/* TARJETAS RESUMEN */}



        <div className="cards">





          <div className="card">


            <h4>

              🧾 Facturas Hoy

            </h4>


            <span>

              {datos.totalFacturas}

            </span>


          </div>







          <div className="card">


            <h4>

              🏪 Tiendas

            </h4>


            <span>

              {datos.totalClientes}

            </span>


          </div>







          <div className="card">


            <h4>

              👷 Trabajadores

            </h4>


            <span>

              {datos.totalTrabajadores}

            </span>


          </div>





        </div>









        {/* ACCESOS RAPIDOS */}



        <div className="acciones">





          <button

            onClick={()=>navigate("/facturas")}

          >

            🧾 Ver Facturas

          </button>







          <button

            onClick={()=>navigate("/tiendas")}

          >

            🏪 Ver Tiendas

          </button>







          <button

            onClick={()=>navigate("/trabajadores")}

          >

            👷 Trabajadores

          </button>






        </div>









        {/* ULTIMAS FACTURAS */}



        <div className="ultimas">





          <div className="titulo-ultimas">



            <h2>

              Últimas facturas

            </h2>





            <button

              className="btn-ver-todas"

              onClick={()=>navigate("/facturas")}

            >

              Ver todas →

            </button>



          </div>









          {

            datos.ultimasFacturas.length === 0 ? (




              <div className="sinDatos">


                No hay facturas registradas.


              </div>





            ) : (




              datos.ultimasFacturas.map((factura)=>(




                <div

                  className="factura"

                  key={factura.id}

                >





                  <div>




                    <strong>


                      Factura #

                      {
                        String(factura.id)
                        .substring(0,8)
                      }



                    </strong>






                    <p>


                      Cliente:

                      {" "}

                      {
                        factura.clientes?.nombre ||

                        "Sin cliente"
                      }



                    </p>






                    <p>


                      📅 {factura.fecha}



                    </p>







                    <p>


                      🕒 

                      {
                        factura.hora?.substring(0,5)
                      }



                    </p>






                  </div>









                  <strong

                    className="valor-dashboard"

                  >



                    $

                    {
                      Number(
                        factura.valor
                      )
                      .toLocaleString("es-CO")
                    }




                  </strong>






                </div>





              ))





            )


          }





        </div>






      </main>





    </div>



  );


}





export default DashboardJefe;