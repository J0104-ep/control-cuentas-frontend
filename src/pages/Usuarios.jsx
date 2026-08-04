import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/Usuarios.css";


function Usuarios() {


    const navigate = useNavigate();


    const [usuarios, setUsuarios] = useState([]);






    useEffect(() => {

        cargarUsuarios();

    }, []);







    const cargarUsuarios = async () => {


        try {


            const respuesta =
                await api.get("/usuarios");


            setUsuarios(
                respuesta.data
            );



        } catch (error) {


            console.error(
                "Error cargando usuarios:",
                error
            );


        }


    };









    // ===============================
    // REGISTRAR ENTREGA
    // ===============================


    const registrarEntrega = async (id) => {


        const valor = prompt(
            "Ingrese el dinero entregado:"
        );



        if (!valor)
            return;







        try {


            await api.post(

                `/usuarios/${id}/entrega`,

                {
                    valor: Number(valor)
                }

            );





            alert(
                "Entrega registrada correctamente"
            );



            cargarUsuarios();






        } catch (error) {


            console.error(error);



            alert(
                "No se pudo registrar la entrega"
            );



        }



    };









    // ===============================
    // ELIMINAR USUARIO
    // ===============================


    const eliminarUsuario = async (id) => {


        const confirmar =
            window.confirm(
                "¿Desea eliminar este usuario?"
            );



        if (!confirmar)
            return;







        try {


            await api.delete(

                `/usuarios/${id}`

            );



            cargarUsuarios();






        } catch (error) {


            console.error(

                "Error eliminando usuario:",

                error

            );



        }



    };












    return (



        <div className="usuarios-page">






            <div className="usuarios-header">






                <div>


                    <h1>
                        👥 Usuarios
                    </h1>



                    <p>
                        Administración de usuarios del sistema
                    </p>



                </div>









                <button

                    className="btn-nuevo"

                    onClick={() =>
                        navigate("/nuevo-usuario")
                    }

                >

                    + Nuevo Usuario

                </button>









                <button

                    className="btn-volver"

                    onClick={() =>
                        navigate("/dashboard")
                    }

                >

                    🏠 Volver

                </button>






            </div>









            <div className="tabla-usuarios">






                <table>



                    <thead>


                        <tr>


                            <th>
                                Nombre
                            </th>



                            <th>
                                Estado
                            </th>



                            <th>
                                Ventas
                            </th>



                            <th>
                                Entregado
                            </th>



                            <th>
                                Pendiente
                            </th>



                            <th>
                                Acciones
                            </th>



                        </tr>


                    </thead>









                    <tbody>





                        {

                            usuarios.length === 0

                            ?



                            <tr>


                                <td colSpan="6">


                                    No hay usuarios registrados


                                </td>



                            </tr>





                            :





                            usuarios.map((usuario)=>(






                                <tr key={usuario.id}>


                                    <td>

                                        {usuario.nombre}

                                    </td>









                                    <td>


                                        <span

                                            className={

                                                usuario.activo

                                                ?

                                                "estado-activo"

                                                :

                                                "estado-inactivo"

                                            }

                                        >



                                            {

                                                usuario.activo

                                                ?

                                                "Activo"

                                                :

                                                "Inactivo"

                                            }



                                        </span>



                                    </td>









                                    <td>


                                        $

                                        {

                                            Number(

                                                usuario.total_ventas || 0

                                            )

                                            .toLocaleString("es-CO")


                                        }



                                    </td>









                                    <td>


                                        $

                                        {

                                            Number(

                                                usuario.dinero_entregado || 0

                                            )

                                            .toLocaleString("es-CO")


                                        }



                                    </td>









                                    <td>


                                        <strong>


                                            $

                                            {

                                                Number(

                                                    usuario.saldo_pendiente || 0

                                                )

                                                .toLocaleString("es-CO")


                                            }



                                        </strong>



                                    </td>









                                    <td>





                                        <button

                                            className="btn-entrega"

                                            onClick={() =>
                                                registrarEntrega(usuario.id)
                                            }

                                        >

                                            💵 Entrega


                                        </button>









                                        <button

                                            className="btn-editar"

                                            onClick={() =>
                                                navigate(
                                                    `/editar-usuario/${usuario.id}`
                                                )
                                            }

                                        >

                                            ✏ Editar


                                        </button>









                                        <button

                                            className="btn-eliminar"

                                            onClick={() =>
                                                eliminarUsuario(usuario.id)
                                            }

                                        >

                                            🗑 Eliminar


                                        </button>






                                    </td>





                                </tr>





                            ))


                        }





                    </tbody>



                </table>







            </div>







        </div>



    );


}



export default Usuarios;