import { useEffect, useState, Component } from "react";
import { Card, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { EditHeader } from "./EditHeader";
import { TaskGroup } from "./TaskGroup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { ckTransform, DefaultCKEditorToolbarConfig } from "../../../../_helper/ckEditorUtils";

export const Task = ({ task }) => {

    const [description, setDescription] = useState(task.description);

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs="8">
                        <CKEditor
                            editor={ ClassicEditor }
                            data={description}
                            config={{
                                toolbar: DefaultCKEditorToolbarConfig
                            }}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                        />
                    </Col>
                    <Col xs="4">
                            <Row>
                                <FormGroup className="row">
                                    <Label className="col-sm-3 col-form-label">{'Temps'}</Label>
                                    <Col sm="9">
                                        <InputGroup>
                                            <InputGroupText><i className="icofont icofont-clock-time"></i></InputGroupText>
                                            <Input className="form-control digits" type="number" placeholder="Minutes" />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </Row>
                    </Col>
                </Row>

                {task.tasks && task.tasks.map((task, index) => (
                    <Task key={index} task={task}/>
                ))}
            </Card.Body>
        </Card>
    );
};

