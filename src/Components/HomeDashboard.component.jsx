import {Container,Row,Col} from "react-bootstrap";
import Lottie from "lottie-react";
import manage from "../Animations/40668-animation-for-manager.json";
import {Link} from "react-router-dom"
import "./style.component.css"
const HomeDashboardComponent=()=>{
    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <Lottie style={{height:"560px"}} loop={true} animationData={manage} />
                    </Col>
                    <Col className="vCenter">
                        <p className="display-6"><b>Admission Portal</b></p>
                        <p>Manage your student admission data hand to hand...</p>
                        <Link to="signin" className="btn cbtn" >Sign In</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default HomeDashboardComponent;
