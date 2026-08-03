import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/trabajadores.css";


function NuevoTrabajador() {


  const navigate = useNavigate();



  const [trabajador, setTrabajador] = useState({

    nombre: "",
    estado: "Activo"

  });



  const [cargando, setCargando] = useState(false);





  const cambiarDato = (e) => {


    setTrabajador({

      ...trabajador,

      [e.target.name]: e.target.value

    });


  };







  const guardarTrabajador = async (e) => {


    e.preventDefault();



    if(trabajador.nombre.trim() === ""){


      alert("Ingrese el nombre del trabajador");

      return;

    }





    try {


      setCargando(true);



      await api.post(

        "/trabajadores",

        {

          nombre: trabajador.nombre.trim(),

          estado: trabajador.estado

        }

      );





      alert(
        "Trabajador creado correctamente"
      );



      navigate("/trabajadores");





    } catch(error) {


      console.error(
        "Error creando trabajador:",
        error.response?.data || error
      );



      alert(
        "No se pudo crear el trabajador"
      );



    } finally {


      setCargando(false);


    }


  };









  return (


    <div className="trabajadores-page">



      <div className="trabajadores-header">


        <div>


          <h1>
            👷 Nuevo Trabajador
          </h1>


          <p>
            Registrar un nuevo trabajador
          </p>


        </div>


      </div>









      <div className="form-trabajador">



        <form onSubmit={guardarTrabajador}>


          <label>
            Nombre
          </label>



          <input

            type="text"

            name="nombre"

            placeholder="Ingrese nombre"

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

              disabled={cargando}

            >


              {
                cargando
                ?
                "Guardando..."
                :
                "Guardar Trabajador"
              }


            </button>







            <button

              type="button"

              className="btn-cancelar"

              onClick={() =>
                navigate("/trabajadores")
              }

            >

              Cancelar


            </button>



          </div>





        </form>




      </div>




    </div>


  );


}



export default NuevoTrabajador;