import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevaFactura.css";


function EditarUsuario() {


    const navigate = useNavigate();

    const { id } = useParams();


    const [formulario, setFormulario] = useState({

        nombre: "",
        estado: "Activo"

    });


    const [cargando, setCargando] = useState(true);






    useEffect(() => {


        cargarUsuario();


    }, []);







    // =========================
    // CARGAR USUARIO
    // =========================


    const cargarUsuario = async () => {


        try {


            const respuesta = await api.get(
                `/usuarios/${id}`
            );



            const usuario = respuesta.data;



            setFormulario({

                nombre: usuario.nombre || "",

                estado: usuario.activo
                    ? "Activo"
                    : "Inactivo"

            });




        } catch (error) {


            console.error(
                "Error cargando usuario:",
                error.response?.data || error
            );


            alert(
                "No se pudo cargar el usuario"
            );


            navigate("/usuarios");


        } finally {


            setCargando(false);


        }


    };








    // =========================
    // CAMBIO INPUTS
    // =========================


    const cambiarCampo = (e) => {


        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });


    };









    // =========================
    // GUARDAR CAMBIOS
    // =========================


    const guardarCambios = async (e) => {


        e.preventDefault();



        try {



            await api.put(

                `/usuarios/${id}`,

                {

                    nombre: formulario.nombre,

                    estado: formulario.estado

                }

            );





            alert(
                "Usuario actualizado correctamente"
            );



            navigate("/usuarios");




        } catch (error) {


            console.error(

                "Error actualizando usuario:",

                error.response?.data || error

            );



            alert(

                "Error actualizando usuario"

            );


        }


    };









    if(cargando){


        return (

            <div className="factura-container">

                <div className="factura-card">

                    <h2>
                        Cargando usuario...
                    </h2>


                </div>

            </div>

        );


    }









    return (



        <div className="factura-container">


            <div className="factura-card">



                <h1>
                    ✏ Editar Usuario
                </h1>





                <form onSubmit={guardarCambios}>


                    <div className="form-grupo">


                        <label>
                            Nombre
                        </label>



                        <input

                            type="text"

                            name="nombre"

                            value={formulario.nombre}

                            onChange={cambiarCampo}

                            required

                        />


                    </div>







                    <div className="form-grupo">


                        <label>
                            Estado
                        </label>




                        <select

                            name="estado"

                            value={formulario.estado}

                            onChange={cambiarCampo}

                        >


                            <option value="Activo">

                                Activo

                            </option>



                            <option value="Inactivo">

                                Inactivo

                            </option>



                        </select>



                    </div>








                    <div className="botones">



                        <button

                            className="btn-guardar"

                            type="submit"

                        >

                            💾 Guardar cambios


                        </button>






                        <button

                            className="btn-cancelar"

                            type="button"

                            onClick={() => navigate("/usuarios")}

                        >

                            Cancelar


                        </button>



                    </div>





                </form>




            </div>



        </div>


    );


}



export default EditarUsuario;