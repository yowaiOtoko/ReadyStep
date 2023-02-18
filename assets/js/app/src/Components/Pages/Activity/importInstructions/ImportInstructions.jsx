import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5, P } from "../../../../AbstractElements";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../../_helper/utils";
import UploadActivityFile from "./UploadActivityFile";

const ImportInstructions = () => {
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
                                <H5>Importer un fichier</H5>
                                <span>
                                    Importer un fichier avec les instructions de l'activité
                                </span>
                            </CardHeader>
                            <CardBody>
                                <UploadActivityFile activityId={id}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ImportInstructions;
