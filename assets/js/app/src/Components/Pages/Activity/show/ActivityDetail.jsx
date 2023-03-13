import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5, P } from "../../../../AbstractElements";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../../_helper/utils";
import { Task } from "./Task";
import { TaskGroup } from "./TaskGroup";

const ActivityDetail = () => {
    let { id } = useParams();
    const [activity, setActivity] = useState();

    useEffect(() => {
        get(`activities/${id}`).then((data) => {
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
                                            to={`/app/activity/import/${activity.id}`}>
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
                                        {activity.tasks.map((task, index) => (
                                            task.label ? <TaskGroup key={index} task={task}/> : <Task key={index} task={task}/>
                                        ))}
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
