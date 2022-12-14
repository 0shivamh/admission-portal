import {Container,Row,Col} from "react-bootstrap";
import Lottie from "lottie-react";
import manage from "../Animations/40668-animation-for-manager.json";
import {Link} from "react-router-dom"
import "./style.component.css"
const HomeDashboardComponent=()=>{
    return(
        <>
            <div className="bg-home">
            <Container >
                <Row>
                    <Col>
                        <Lottie style={{height:"560px"}} loop={true} animationData={manage} />
                    </Col>
                    <Col className="vCenter" style={{marginTop:"auto",marginBottom:"auto"}}>
                        <p className="display-2"><b>Admission Portal</b></p>
                        <p>Manage student admission data hand to hand...</p>
                        <Link to="signin" className="btn cbtn mt-4 m-lg-2 btn-lg" >Sign In</Link>
                        <Link to="/register" className="btn cbtn mt-4 m-lg-2 btn-lg" >Admission Dean Sign Up</Link>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
export default HomeDashboardComponent;
