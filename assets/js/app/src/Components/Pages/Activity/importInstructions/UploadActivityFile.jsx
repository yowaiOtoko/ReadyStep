import React, { Fragment, useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import { get } from '../../../../_helper/utils';
import Highlightable from 'highlightable';

const UploadActivityFile = ({activityId}) => {

  const [activityText, setActivityText] = useState('');

  const [ranges, setRanges] = useState([]);

  const getUploadParams = ({ file, meta }) => {
    console.log('getUploadParams');
    const body = new FormData()
    body.append('file', file)
    return { url: `http://localhost:8001/api/task-lists/${activityId}/import`, body }
  };


  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr, ...rest }, status) => {

    if(status === 'done') {

      get(`task_lists/${activityId}`).then((data) => {
        setActivityText(data.instructionText);
    });

      // setActivityText(file.response)
    }
  };

  const handleMouseUp = () =>  {
    // console.log(window.getSelection());
    const selected = window.getSelection().getRangeAt(0);
    const newRanges = [...ranges, {
      start: selected.startOffset,
      end: selected.endOffset,
      text: selected.toString()

    }];

    setRanges(newRanges);
    console.log(ranges)
  };


  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label>label</Label>
            <Dropzone
              className='dropzone dz-clickable'
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}

              canCancel={false}
              inputContent='Drop A File'
              styles={{
                dropzone: { width: '100%', height: 150 },
                dropzoneActive: { borderColor: 'green' },
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <Highlightable ranges={ranges}
               enabled={true}
                // onTextHighlighted={() => {}}
               id={'1'}
              onMouseOverHighlightedWord={() => {}}
               highlightStyle={{
                 backgroundColor: '#ffcc80'
               }}
               text={activityText}

        >


        </Highlightable>
        <pre onMouseUp={handleMouseUp}>{activityText}</pre>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UploadActivityFile;
