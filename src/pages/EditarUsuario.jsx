import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevaFactura.css";


function EditarUsuario() {


    const navigate = useNavigate();

    const { id } = useParams();



    const [formulario, setFormulario] = useState({

        nombre: "",

        estado: "Activo",

        total_ventas: 0,

        dinero_entregado: 0,

        saldo_pendiente: 0

    });



    const [cargando, setCargando] = useState(true);






    useEffect(()=>{

        cargarUsuario();

    }, []);







    // =========================
    // CARGAR USUARIO
    // =========================


    const cargarUsuario = async()=>{


        try{


            const respuesta = await api.get(
                `/usuarios/${id}`
            );


            const usuario = respuesta.data;



            setFormulario({


                nombre:
                usuario.nombre || "",



                estado:

                usuario.activo

                ?

                "Activo"

                :

                "Inactivo",



                total_ventas:

                usuario.total_ventas || 0,



                dinero_entregado:

                usuario.dinero_entregado || 0,



                saldo_pendiente:

                usuario.saldo_pendiente || 0


            });



        }catch(error){


            console.error(
                "Error cargando usuario:",
                error
            );


            alert(
                "No se pudo cargar el usuario"
            );


            navigate("/usuarios");



        }finally{


            setCargando(false);


        }


    };









    // =========================
    // CAMBIO INPUTS
    // =========================


    const cambiarCampo=(e)=>{


        setFormulario({

            ...formulario,

            [e.target.name]:

            e.target.value


        });


    };









    // =========================
    // GUARDAR CAMBIOS
    // =========================


    const guardarCambios = async(e)=>{


        e.preventDefault();



        try{



            const ventas =
            Number(formulario.total_ventas);



            const entregado =
            Number(formulario.dinero_entregado);



            const pendiente =
            Math.max(
                0,
                ventas - entregado
            );





            await api.put(

                `/usuarios/${id}`,

                {


                    nombre:
                    formulario.nombre,



                    estado:
                    formulario.estado,



                    total_ventas:
                    ventas,



                    dinero_entregado:
                    entregado,



                    saldo_pendiente:
                    pendiente


                }

            );





            alert(
                "Usuario actualizado correctamente"
            );



            navigate("/usuarios");





        }catch(error){


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


        return(

            <div className="factura-container">

                <div className="factura-card">


                    <h2>
                        Cargando usuario...
                    </h2>


                </div>


            </div>


        );


    }








    return(



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









                    <div className="form-grupo">


                        <label>
                            Ventas
                        </label>



                        <input

                            type="number"

                            name="total_ventas"

                            value={formulario.total_ventas}

                            onChange={cambiarCampo}

                        />


                    </div>









                    <div className="form-grupo">


                        <label>
                            Dinero entregado
                        </label>



                        <input

                            type="number"

                            name="dinero_entregado"

                            value={formulario.dinero_entregado}

                            onChange={cambiarCampo}

                        />


                    </div>









                    <div className="form-grupo">


                        <label>
                            Pendiente
                        </label>



                        <input

                            type="number"

                            value={

                                Math.max(

                                    0,

                                    Number(formulario.total_ventas)

                                    -

                                    Number(formulario.dinero_entregado)

                                )

                            }

                            disabled

                        />


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

                            onClick={() =>
                                navigate("/usuarios")
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



export default EditarUsuario;