import React, { Fragment } from "react";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Breadcrumbs, P } from "../../../AbstractElements";
import { SampleCard } from "../../../Constant";
import ActivityList from "./list/ActivityList";

const Activity = () => {
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
                                        <div className="text-end">
                                            <Link
                                                className="btn btn-primary"
                                                style={{ color: "white" }}
                                                to={`${process.env.PUBLIC_URL}/app/activity/new`}
                                            >

                                                <PlusCircle />
                                                <span style={{marginRight:"3"}}> Nouvelle activité</span>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <ActivityList></ActivityList>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Activity;
