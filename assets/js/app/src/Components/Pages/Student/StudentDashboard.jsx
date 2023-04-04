
import React, { Fragment, useEffect, useState } from "react";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Breadcrumbs, P } from "../../../AbstractElements";
import { SampleCard } from "../../../Constant";
import { get } from "../../../_helper/utils";
import { SessionCard } from "../Session/show/components/SessionCard";

export const StudentDashboard = () => {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        get(`sessions`, {dateProperties: ['createdAt', 'startedAt']}).then((data) => {

            setSessions(data)
        });
    }, []);

    console.log(sessions);

    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Home"
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
                                                to={`/teach/activity/new`}
                                            >

                                                <PlusCircle />
                                                <span style={{marginRight:"3"}}> Nouvelle activité</span>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm='12'>
                                        {sessions.map((session, index) => <SessionCard session={session} key={session.id}/>)}

                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}