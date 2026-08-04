import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevaFactura.css";


function NuevoUsuario() {


    const navigate = useNavigate();



    const [formulario, setFormulario] = useState({

        nombre:"",
        estado:"Activo"

    });






    const cambiarCampo = (e)=>{


        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });


    };









    const guardarUsuario = async(e)=>{


        e.preventDefault();



        try{



            await api.post(

                "/usuarios",

                {

                    nombre: formulario.nombre,

                    estado: formulario.estado

                }

            );





            alert(
                "Usuario creado correctamente"
            );



            navigate("/usuarios");





        }catch(error){



            console.error(

                "Error creando usuario:",

                error.response?.data || error

            );



            alert(

                "No se pudo crear el usuario"

            );


        }



    };









    return(



        <div className="factura-container">


            <div className="factura-card">



                <h1>
                    👤 Nuevo Usuario
                </h1>






                <form onSubmit={guardarUsuario}>


                    <div className="form-grupo">


                        <label>
                            Nombre
                        </label>



                        <input

                            type="text"

                            name="nombre"

                            value={formulario.nombre}

                            onChange={cambiarCampo}

                            placeholder="Ingrese nombre"

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

                            💾 Guardar Usuario

                        </button>






                        <button

                            className="btn-cancelar"

                            type="button"

                            onClick={()=>navigate("/usuarios")}

                        >

                            Cancelar

                        </button>





                    </div>





                </form>




            </div>



        </div>



    );


}



export default NuevoUsuario;