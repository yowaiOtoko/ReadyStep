import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5, P } from "../../../../AbstractElements";
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { get, post } from "../../../../_helper/utils";
import UploadActivityFile from "./UploadActivityFile";
import { Editor } from "../../../Common/mdxEditor";
import Preview from "./Preview";
import TextSelector from "./TextSelector";

const ImportInstructions = () => {
    let { id } = useParams();
    const [activity, setActivity] = useState();
    const [activityText, setActivityText] = useState(
        "aaaaaaaa zzzzzzzzz eeeeeeeeeeee   "
    );
    const [nodes, setNodes] = useState({});

    useEffect(() => {
        get(`task_lists/${id}`).then((data) => {
            console.log(data);
            setActivity(data);
        });
    }, []);

    const onFileResponse = () => {
        get(`task_lists/${id}`).then((data) => {
            setActivityText(data.instructionText);
        });
    };

    const onContentUpdated = (data) => {
        console.log(data);
        setNodes({});
    };

    const onSave = () => {
        post(`task-lists/${id}/save`, nodes).then((data) => {
            console.log(data);
        });

    };

    if (!activity) return null;
    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Importer un fichier"
                title={<Link to={`/app/activity/show/${activity.id}`}>{activity.name}</Link>}
                parent={<Link to={'/app/activity/list'}>Activités</Link>}
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <H5>Importer un fichier</H5>
                                <span>
                                    Importer un fichier avec les instructions de
                                    l'activité
                                </span>
                                <Button onClick={onSave}>Sauvegarder</Button>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <UploadActivityFile
                                        activityId={id}
                                        onResponse={onFileResponse}
                                    />
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <TextSelector
                                            text={activityText}
                                            setNodes={setNodes}
                                            nodes={nodes}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        {<Preview nodes={nodes}/>}
                                    </Col>
                                </Row>
                                {/* { activityText && <Editor children={activityText} onContentUpdated={onContentUpdated}></Editor>} */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ImportInstructions;
