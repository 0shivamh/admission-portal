import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";

const BackbtnComponent = ()=>{
    const navigate = useNavigate();


    return(<>
                <Row xs={2}>
                    <Col>
                        <Link to="/" className="btn cbtn">Home</Link>

                        <Link to={-1} className="btn cbtn">Back</Link>
                    </Col>
                    <Col>
                    </Col>
                </Row>
        </>)
}
export default BackbtnComponent;
