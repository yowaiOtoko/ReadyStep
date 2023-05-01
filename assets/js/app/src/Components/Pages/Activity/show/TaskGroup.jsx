import { Task } from "./Task";
import { Accordion, Card, Col, Container, OverlayTrigger, Popover, Row, useAccordionButton } from "react-bootstrap";
import { ckTransform, DefaultCKEditorToolbarConfig, defaultConfig } from "../../../../_helper/ckEditorUtils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CardBody } from "reactstrap";
import useDebounce from "../../../../_helper/useDebounce";
import { useEffect, useState } from "react";
import { useHttp } from "../../../../_helper/http/useHttp";
import Editor from 'ckeditor5-custom-build/build/ckeditor';

export const TaskGroup = ({ task, readOnly }) => {

    const [description, setDescription] = useState(task.description)
    const debouncedValue = useDebounce(description, 1000)
    const http = useHttp();

    useEffect(() => {
        if(debouncedValue !== task.description){
            console.log('debouncedValue')
            http.patch(`/api/tasks/${task.id}`, {
                    description: debouncedValue
                }).then((data) => {
                    console.log('patched')
                    console.log(data);
            });
        }
    }, [debouncedValue])

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
          console.log(task.id),
        );

        return (
          <span
          style={{cursor: "pointer", fontSize: "x-large"}}
            onClick={decoratedOnClick}
          >
            {children}
          </span>
        );
    }

console.log(defaultConfig.toolbar)

    return (
    <>


        <div className="pt-2" >
            <div className="d-flex">

                <CustomToggle eventKey={task.id} >{task.label}</CustomToggle>


            </div>
            <Accordion.Collapse eventKey={task.id}>

                <Row>


                <Card >
                    {/* <pre className="task__description">label {task.label} </pre> */}
                    <CardBody>
                        <Row>
                            <Col xs="8">
                                <div className="pb-3">

                                    <CKEditor
                                        editor={ Editor }
                                        data={task.description}
                                        config={{
                                            toolbar: readOnly ? false : defaultConfig.toolbar

                                        }}
                                        onReady={ editor => {
                                            if(readOnly){
                                                editor.enableReadOnlyMode('aaa')

                                            }
                                        }}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setDescription(data)
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
                    </CardBody>
                </Card>
                <Row>
                {task.tasks && task.tasks.filter(t => !t.label).map((task, index) => (
                        <Task key={index} task={task} readOnly={readOnly}/>
                    ))}
                    </Row>
                    </Row>
            </Accordion.Collapse>
        </div>

        {/* {task.tasks && task.tasks.filter(t => t.label).map((task, index) => (
            <TaskGroup key={index} task={task} readOnly={readOnly}/>
        ))} */}
    </>
    );
};
