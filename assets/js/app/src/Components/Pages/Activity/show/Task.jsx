import { useEffect, useState, Component } from "react";
import { Card, Col, OverlayTrigger, Popover, Row, Button } from "react-bootstrap";
import { EditHeader } from "./EditHeader";
import { TaskGroup } from "./TaskGroup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { defaultConfig } from "../../../../_helper/ckEditorUtils";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { DefaultCKEditorToolbarConfig } from "../../../../_helper/ckEditorUtils";
import { TaskEditActions } from "./TaskEditActions";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import useDebounce from "../../../../_helper/useDebounce";
import { useHttp } from "../../../../_helper/http/useHttp";
import { TaskShowActions } from "./TaskShowActions";

export const Task = ({ task, readOnly, session }) => {

    const [description, setDescription] = useState(task.description);
    const debouncedValue = useDebounce(description, 1000)
    const http = useHttp();
    console.log(readOnly)

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


    return (
        <Card>
            <Card.Body>
                <Row>

                    <Col xs="1" className={'d-flex align-items-center '} >

                        <div style={{    backgroundColor: "#2196f38c", borderRadius: "5px"}}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-check"
                                width={50} height={50} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
                                <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
                                <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
                                <path d="M11 6l9 0"></path>
                                <path d="M11 12l9 0"></path>
                                <path d="M11 18l9 0"></path>
                            </svg>
                        </div>
                    </Col>
                    <Col xs="8">
                        <CKEditor
                            editor={ Editor }
                            data={description}
                            config={{
                                toolbar: readOnly ? false : defaultConfig.toolbar

                            }}
                            onReady={ editor => {
                                if(readOnly){
                                    editor.enableReadOnlyMode('aaa')
                                }

                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data)
                                console.log( { event, editor, data } );
                            } }
                        />
                    </Col>
                    <Col xs="3">
                            <Row>
                                {readOnly ? <TaskShowActions task={task} session={session}/> :  <TaskEditActions/>}
                            </Row>
                    </Col>
                </Row>

            </Card.Body>
            {/* {task.tasks && task.tasks.map((task, index) => (
                <Task key={index} task={task} readOnly/>
            ))} */}
        </Card>
    );
};

