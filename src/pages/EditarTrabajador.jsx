import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../styles/trabajadores.css";


function EditarTrabajador() {


  const navigate = useNavigate();

  const { id } = useParams();




  const [trabajador,setTrabajador] = useState({

    nombre:"",
    estado:"Activo"

  });






  useEffect(()=>{


    obtenerTrabajador();


  },[]);







  const obtenerTrabajador = async()=>{


    try{


      const respuesta =
      await api.get(
        `/trabajadores/${id}`
      );



      setTrabajador({

        nombre:
        respuesta.data.nombre || "",


        estado:
        respuesta.data.estado || "Activo"


      });




    }catch(error){


      console.error(
        "Error cargando trabajador:",
        error
      );


    }


  };








  const cambiarDato=(e)=>{


    setTrabajador({

      ...trabajador,

      [e.target.name]:e.target.value

    });


  };









  const actualizarTrabajador=async(e)=>{


    e.preventDefault();



    try{


      await api.put(

        `/trabajadores/${id}`,

        trabajador

      );



      alert(
        "Trabajador actualizado"
      );



      navigate("/trabajadores");




    }catch(error){


      console.error(
        "Error actualizando trabajador:",
        error
      );


    }


  };









  return (


    <div className="trabajadores-page">





      <div className="trabajadores-header">


        <div>


          <h1>
            ✏️ Editar Trabajador
          </h1>


          <p>
            Actualizar información del trabajador
          </p>


        </div>




        <button

          className="btn-dashboard"

          onClick={()=>navigate("/dashboard")}

        >

          🏠 Volver Dashboard


        </button>




      </div>









      <div className="form-trabajador">



        <form onSubmit={actualizarTrabajador}>



          <label>
            Nombre
          </label>



          <input

            type="text"

            name="nombre"

            value={trabajador.nombre}

            onChange={cambiarDato}

            required

          />








          <label>
            Estado
          </label>



          <select

            name="estado"

            value={trabajador.estado}

            onChange={cambiarDato}

          >


            <option value="Activo">
              Activo
            </option>


            <option value="Inactivo">
              Inactivo
            </option>



          </select>









          <div className="botones-form">



            <button

              type="submit"

              className="btn-guardar"

            >

              💾 Guardar cambios


            </button>






            <button

              type="button"

              className="btn-cancelar"

              onClick={()=>navigate("/trabajadores")}

            >

              Cancelar


            </button>




          </div>




        </form>




      </div>




    </div>


  );


}



export default EditarTrabajador;