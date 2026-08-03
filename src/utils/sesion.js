export const guardarSesion = (usuario)=>{

    const sesion = {

        usuario,

        fecha:
        new Date()
        .toISOString()
        .split("T")[0]

    };


    localStorage.setItem(
        "sesion",
        JSON.stringify(sesion)
    );

};



export const obtenerSesion = ()=>{


    const datos =
    localStorage.getItem("sesion");


    if(!datos){

        return null;

    }



    const sesion =
    JSON.parse(datos);



    const hoy =
    new Date()
    .toISOString()
    .split("T")[0];



    if(sesion.fecha !== hoy){


        localStorage.removeItem("sesion");

        return null;

    }



    return sesion.usuario;


};



export const cerrarSesion = ()=>{

    localStorage.removeItem("sesion");

};