import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5, P } from "../../../../AbstractElements";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../../_helper/utils";

const ActivityDetail = () => {
    let { id } = useParams();
    const [activity, setActivity] = useState();

    useEffect(() => {
        get(`task_lists/${id}`).then((data) => {
            console.log(data);
            setActivity(data);
        });
    }, []);

    if(!activity) return null;
    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Sample Card"
                parent="Pages"
                title="Sample Card"
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <H5>{activity.name}</H5>
                                <span>
                                    {activity.createdAt}
                                </span>
                            </CardHeader>
                            <CardBody>
                                <Link
                                    className="btn btn-primary"
                                    to={`${process.env.PUBLIC_URL}/app/activity/importer/${activity.id}`}>
                                    Importer un fichier
                                </Link>
                                <p style={{whiteSpace: "pre-wrap"}}>
                                    {activity.description}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ActivityDetail;
