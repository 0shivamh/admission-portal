import {useState, useEffect, useReducer} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {Container} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const SigninPage=()=>{

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    useEffect(() => {
    }, [])


    async function login(event){
        event.preventDefault()
        const response= await fetch("http://localhost:5001/api/login",
            {
                method:'POST',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    psw,
                }),
            })
        const data= await response.json();

        if(data.status==='okay'){
            localStorage.setItem('token',data.user)
            localStorage.setItem('email',email);

            Swal.fire(
                {title:'Login Successful!',
                    text:'Welcome to admission portal!',
                    icon:'success',
                    confirmButtonColor: '#242B2E',
                    allowOutsideClick: false,
                    allowEscapeKey: false}
            ).then((result) => {
                if (result.isConfirmed) {
                }
            })
            navigate(`/dashboard`);
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Login Failed!',
                    text:'Please check email or password!',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
        }
        //to clear all field
        setEmail("");
        setPsw("")
    }

    return(
        <>
            <div className="bg-home">
            <Container className="d-flex justify-content-center">
            <div className="d-inline-flex p-2  text-center mt-4 ">
                <form className="c-form"  onSubmit={login}>
                    <span className="display-6"><Icon.Person/> </span>
                    <p className="h3">Admission Officer Login</p>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="abc@example.com"
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                               value={psw}
                               onChange={(e)=> setPsw(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="submit" className="btn white-btn mt-2 mb-2" >Sign In</button><br/>
                    <Link to="/register" style={{color:"white"}}>Don't have account? Create one</Link><br/>
                    <Link to="/reset-password" style={{color:"white"}}>Forgot Password?</Link>
                </form>
            </div>
            </Container>
            </div>
        </>
    )
}
export default SigninPage;
