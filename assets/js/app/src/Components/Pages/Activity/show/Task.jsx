import { useEffect, useState, Component } from "react";
import { Card, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { EditHeader } from "./EditHeader";
import { TaskGroup } from "./TaskGroup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const Task = ({ task }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [description, setDescription] = useState(task.description);
    const [textareaHeight, setTextareaHeight] = useState(1);

    const onKeyUp = (e) => {

        const textarea = e.target
        setTextareaHeight(calcHeight(textarea.value))
    }

    function calcHeight(value) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
      }


    useEffect(() => {


          let textarea = document.querySelector(".resize-ta");
          if(!textarea) return;

          setTextareaHeight(calcHeight(description))
        //   textarea.addEventListener("keyup", () => {
        //     textarea.style.height = calcHeight(textarea.value) + "px";
        //   });
    }, []);


    function nl2br (str, is_xhtml) {


        return (str + '')
        .replace(/(?:(.+)((?:\r\n|[\r\n]).+?))+?/gm,  '$1<br/>$2')
        .replace(/^(.*(?:(\r\n|[\r\n]).+$)*)/gm,  '<p>---$1</p>' );
      }
    function space2nbsp (str, is_xhtml) {


        const spaceTag = '&nbsp;';

        return (str + '')
        //.replace(/(\t)/g, spaceTag+spaceTag+spaceTag+spaceTag)
        //.replace(/( )/g, spaceTag)
        //.replace(/(\r\n|\n\r|\r|\n)/g, '' );
        ;
      }

    const popover = () => (
        <Popover className="new-section-action-popover">
            <Popover.Body>
                aaaa
            </Popover.Body>
        </Popover>
    );

        console.log(nl2br(description))
    return (
        <Card onClick={() => setShowEdit(true)} onBlur={() => setShowEdit(false)} >
            <Card.Body>

                {/* <pre className="task__description">label {task.label} </pre> */}
                <Row>
                <Col xs="10">
                <CKEditor
                    editor={ ClassicEditor }
                    data={`<p>${space2nbsp(nl2br(description))}</p>`}
                    config={{
                        toolbar: [ 'heading', '|', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
                    }}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                {/* <span class="textarea task-description-edit"  role="textbox" contentEditable></span>
                    <textarea
                        className={`task-description-edit resize-ta ${showEdit ? '' : 'hidden'}`}
                        value={description}
                        onKeyDown={onKeyUp}
                        style={{height: textareaHeight}}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <pre className={`task__description ${!showEdit ? '' : 'hidden'}`}>aaa{task.description} </pre> */}
                    <pre >{task.description} </pre>
                </Col>
                </Row>

                {task.tasks && task.tasks.map((task, index) => (
                    <Task key={index} task={task}/>
                ))}
            </Card.Body>
        </Card>
    );
};
