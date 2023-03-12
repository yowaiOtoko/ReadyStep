import { Task } from "./Task";
import { Card, Col, Container, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { ckTransform, DefaultCKEditorToolbarConfig } from "../../../../_helper/ckEditorUtils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const TaskGroup = ({ task }) => {

    return (
        <>

        <Card >
            <Card.Header>
                {task.label}
            </Card.Header>
            <Card.Body>

                {/* <pre className="task__description">label {task.label} </pre> */}
                <Row>
                    <Col xs="8">
                        <div className="pb-3">

                            <CKEditor
                                editor={ ClassicEditor }
                                data={task.description}
                                config={{
                                    toolbar: DefaultCKEditorToolbarConfig
                                }}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    console.log( { event, editor, data } );
                                } }
                            />
                        </div>
                    </Col>
                    <Col xs="4">
                            <Row>

                            </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {task.tasks && task.tasks.map((task, index) => (
                            task.label ? <TaskGroup key={index} task={task}/> : <Task key={index} task={task}/>
                            ))}
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </>
    );
};
