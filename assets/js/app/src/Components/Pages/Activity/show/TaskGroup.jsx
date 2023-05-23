import { Task } from "./Task";
import { Accordion, Card, Col, Container, OverlayTrigger, Popover, Row, useAccordionButton } from "react-bootstrap";
import { ckTransform, DefaultCKEditorToolbarConfig, defaultConfig } from "../../../../_helper/ckEditorUtils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CardBody } from "reactstrap";
import useDebounce from "../../../../_helper/useDebounce";
import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../../../_helper/http/useHttp";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import SessionProvider from "../../Student/SessionProvider";

export const TaskGroup = ({ taskGroup, readOnly }) => {


    const [description, setDescription] = useState(taskGroup.description)
    const debouncedValue = useDebounce(description, 1000)
    const http = useHttp();

    const {session, setSession, taskState, setTaskState} = useContext(SessionProvider);

    useEffect(() => {
        if(debouncedValue !== taskGroup.description){
            console.log('debouncedValue')
            http.patch(`/api/tasks/${taskGroup.id}`, {
                    description: debouncedValue
                }).then((data) => {
                    console.log('patched')
                    console.log(data);
            });
        }
    }, [debouncedValue])

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
          console.log(taskGroup.id),
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
                <CustomToggle eventKey={taskGroup.id} >{taskGroup.label}</CustomToggle>
            </div>
            <Accordion.Collapse eventKey={taskGroup.id}>
                <Row>
                    {/* <Card >

                        <CardBody>
                            <Row>
                                <Col xs="8">
                                    <div className="pb-3">

                                        <CKEditor
                                            editor={ Editor }
                                            data={taskGroup.description}
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
                    </Card> */}
                    <Row>
                        { taskGroup.tasks.map((task, index) => (
                            <Task key={index} task={task} state={taskState[task.id]} readOnly={readOnly} session={session}/>
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
