import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevafactura.css";


function EditarFactura() {


  const navigate = useNavigate();

  const { id } = useParams();



  const [clientes, setClientes] = useState([]);

  const [busqueda, setBusqueda] = useState("");



  const [formulario, setFormulario] = useState({

    cliente_id:"",
    valor:"",
    fecha:"",
    hora:""

  });



  const [imagen,setImagen] = useState(null);

  const [vistaPrevia,setVistaPrevia] = useState(null);







  useEffect(()=>{

    cargarClientes();

    cargarFactura();

  },[]);







  const cargarClientes = async()=>{


    try{


      const respuesta = await api.get("/clientes");


      setClientes(respuesta.data);



    }catch(error){


      console.error(
        "Error cargando clientes:",
        error
      );


    }


  };









  const cargarFactura = async()=>{


    try{


      const respuesta = await api.get(
        `/facturas/${id}`
      );


      const factura = respuesta.data;




      setFormulario({

        cliente_id:factura.cliente_id,

        valor:factura.valor,

        fecha:factura.fecha,

        hora:
        factura.hora
        ?
        factura.hora.substring(0,5)
        :
        ""

      });






      if(factura.foto_url){


        setVistaPrevia(
          factura.foto_url
        );


      }





    }catch(error){


      console.error(
        "Error cargando factura:",
        error
      );


    }


  };









  const cambiarCampo=(e)=>{


    setFormulario({

      ...formulario,

      [e.target.name]:e.target.value

    });


  };









  const seleccionarImagen=(e)=>{


    const archivo=e.target.files[0];


    if(!archivo)return;



    setImagen(archivo);



    setVistaPrevia(

      URL.createObjectURL(archivo)

    );


  };









  const actualizarFactura=async(e)=>{


    e.preventDefault();



    try{


      const datos=new FormData();




      datos.append(
        "cliente_id",
        formulario.cliente_id
      );



      datos.append(
        "valor",
        formulario.valor
      );



      datos.append(
        "fecha",
        formulario.fecha
      );



      datos.append(
        "hora",
        formulario.hora
      );





      if(imagen){


        datos.append(
          "imagen",
          imagen
        );


      }







      await api.put(

        `/facturas/${id}`,

        datos,

        {

          headers:{

            "Content-Type":
            "multipart/form-data"

          }

        }

      );






      alert(
        "Factura actualizada correctamente"
      );



      navigate("/facturas");





    }catch(error){


      console.error(error);



      alert(
        "Error actualizando factura"
      );


    }


  };









  const clientesFiltrados = clientes.filter(cliente=>


    cliente.nombre
    .toLowerCase()
    .includes(
      busqueda.toLowerCase()
    )


  );









  return (


    <div className="factura-container">



      <div className="factura-card">





        <div className="factura-header-editar">



          <div className="factura-titulo-editar">


            <h1>
              ✏ Editar Factura
            </h1>



            <p>
              Actualización de información de factura
            </p>


          </div>







          <button


            className="btn-volver-factura"


            type="button"


            onClick={()=>navigate("/dashboard")}


          >


            🏠 Volver


          </button>





        </div>









        <form onSubmit={actualizarFactura}>


          <div className="form-grupo">


            <label>
              Buscar cliente
            </label>




            <div className="busqueda-cliente">


              <input

                type="text"

                placeholder="🔎 Buscar cliente..."

                value={busqueda}

                onChange={(e)=>
                  setBusqueda(e.target.value)
                }

              />


            </div>







            <select


              name="cliente_id"


              value={formulario.cliente_id}


              onChange={cambiarCampo}


              required


            >



              <option value="">


                Seleccione un cliente


              </option>





              {

                clientesFiltrados.map(cliente=>(


                  <option


                    key={cliente.id}


                    value={cliente.id}


                  >


                    {cliente.nombre}


                  </option>


                ))

              }




            </select>



          </div>









          <div className="form-grupo">


            <label>
              Valor
            </label>



            <input


              type="number"


              name="valor"


              value={formulario.valor}


              onChange={cambiarCampo}


              required


            />


          </div>









          <div className="form-grupo">


            <label>
              Fecha
            </label>



            <input


              type="date"


              name="fecha"


              value={formulario.fecha}


              onChange={cambiarCampo}


              required


            />


          </div>









          <div className="form-grupo">


            <label>
              Hora
            </label>



            <input


              type="time"


              name="hora"


              value={formulario.hora}


              onChange={cambiarCampo}


              required


            />


          </div>









          <div className="form-grupo">


            <label>
              Imagen de la factura
            </label>




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









          {

            vistaPrevia && (


              <img


                src={vistaPrevia}


                alt="Factura"


                className="preview-factura"


              />


            )

          }









          <div className="botones">



            <button


              type="submit"


              className="btn-guardar"


            >


              💾 Guardar Cambios


            </button>









            <button


              type="button"


              className="btn-cancelar"


              onClick={()=>navigate("/facturas")}


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