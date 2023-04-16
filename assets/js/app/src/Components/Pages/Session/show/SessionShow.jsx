import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import { get } from "../../../../_helper/utils";
import Loader from "../../../Common/Component/Loader";
import Users from "./components/Users";


const SessionShow = () => {

    const [session, setSession] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        get(`api/sessions/${id}`).then((data) => {
            console.log(data);
            setSession(data);
            setIsLoading(false);
        });
    }, []);

    if(isLoading){
        return <Loader/>
    }

    return (
        <>
            <Breadcrumbs
                mainTitle="Activités"
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="6">
                        <Users users={session.users}></Users>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SessionShow;