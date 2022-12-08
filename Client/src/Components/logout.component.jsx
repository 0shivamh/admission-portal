// import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Logout = () => {
    let navigate = useNavigate();



    const handleLogout = ()=>{
        localStorage.clear();

        navigate(`/`);

        Swal.fire(
            {title:'Logout Successful!',
            icon:'success',
            confirmButtonColor: '#5ae4a7', allowOutsideClick: false,
            allowEscapeKey: false,}
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(true);
            }
          })
    }


    return(
        <>
            <button  className="btn cbtn m-2" onClick={handleLogout}>Sign Out</button>

        </>
    )
}
export default Logout;
