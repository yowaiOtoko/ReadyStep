import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5, P } from "../../../../AbstractElements";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../../_helper/utils";
import { Task } from "./Task";
import { TaskGroup } from "./TaskGroup";
import { useHttp } from "../../../../_helper/http/useHttp";
import { Accordion } from "react-bootstrap";

const ActivityDetail = () => {
    let { id } = useParams();
    const [activity, setActivity] = useState();
    const http = useHttp();

    useEffect(() => {
        http.get(`/api/activities/${id}`).then((data) => {
            console.log(data);
            setActivity(data);
        });
    }, []);

    if(!activity) return null;
    return (
        <Fragment>
            <Breadcrumbs
                mainTitle={activity.name}
                parent={<Link to={'/app/activity/list'}>Activités</Link>}

            />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <H5>{activity.name}</H5>
                                        <span>
                                            {activity.createdAt}
                                        </span>
                                    </div>
                                    <div>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/teach/activity/import/${activity.id}`}>
                                            Importer un fichier
                                        </Link>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>

                                <p style={{whiteSpace: "pre-wrap"}}>
                                    {activity.description}
                                </p>
                                <Row>
                                    <Col sm='12'>
                                        <Accordion defaultActiveKey={activity.taskGroups.map(t => t.id)} flush alwaysOpen>
                                            <>
                                                {activity.taskGroups.map((group, index) => (
                                                    <TaskGroup key={index} taskGroup={group}/>
                                                ))}
                                            </>
                                        </Accordion>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ActivityDetail;
