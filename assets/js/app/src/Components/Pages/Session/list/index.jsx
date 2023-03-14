import React, { Fragment } from "react";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Breadcrumbs, P } from "../../../../AbstractElements";
import { SampleCard } from "../../../../Constant";
import SessionList from "./SessionList";

const Sessions = () => {
    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Activités"
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="6" />

                                    <Col md="6">
                                       
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <SessionList/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Sessions;
