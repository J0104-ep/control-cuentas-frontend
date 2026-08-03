import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/login.css";


function Login(){


    const navigate = useNavigate();


    const [nombre,setNombre] = useState("");

    const [cargando,setCargando] = useState(false);



    // =====================================
    // VERIFICAR SESION DEL DIA
    // =====================================

    useEffect(()=>{


        const usuarioGuardado =
        localStorage.getItem("usuario");


        const sesionGuardada =
        localStorage.getItem("sesion");



        const hoy =
        new Date()
        .toISOString()
        .split("T")[0];





        if(
            usuarioGuardado &&
            sesionGuardada === hoy
        ){


            const usuario =
            JSON.parse(usuarioGuardado);





            if(usuario.rol === "jefe"){


                navigate("/dashboard");


            }else{


                navigate("/dashboard-trabajador");


            }


        }



    },[navigate]);









    const iniciarSesion = async(e)=>{


        e.preventDefault();



        if(nombre.trim()===""){


            alert("Ingrese su nombre");

            return;


        }







        try{



            setCargando(true);






            const respuesta =
            await api.post(
                "/auth/login",
                {
                    nombre:nombre.trim()
                }
            );






            const usuario =
            respuesta.data.usuario;








            // Fecha actual

            const hoy =
            new Date()
            .toISOString()
            .split("T")[0];







            // Guardar usuario completo

            localStorage.setItem(

                "usuario",

                JSON.stringify(usuario)

            );






            // Guardar datos del usuario

            localStorage.setItem(
                "usuario_id",
                usuario.id
            );



            localStorage.setItem(
                "usuario_nombre",
                usuario.nombre
            );



            localStorage.setItem(
                "usuario_rol",
                usuario.rol
            );






            // Guardar sesión del día

            localStorage.setItem(
                "sesion",
                hoy
            );









            if(usuario.rol === "jefe"){



                navigate("/dashboard");



            }else{



                navigate("/dashboard-trabajador");



            }







        }catch(error){



            console.error(
                error.response?.data || error
            );



            alert(

                error.response?.data?.mensaje ||
                "Error iniciando sesión"

            );





        }finally{



            setCargando(false);



        }




    };









    return(


        <div className="login-container">


            <div className="login-card">



                <h1>
                    👋 Bienvenido
                </h1>





                <p>
                    Ingrese su nombre para continuar
                </p>







                <form onSubmit={iniciarSesion}>


                    <input


                        type="text"


                        placeholder="Ingrese su nombre"


                        value={nombre}


                        onChange={(e)=>
                            setNombre(e.target.value)
                        }


                    />








                    <button


                        type="submit"


                        disabled={cargando}


                    >


                        {
                            cargando
                            ?
                            "Ingresando..."
                            :
                            "Entrar"
                        }



                    </button>





                </form>






            </div>





        </div>



    );


}



export default Login;