import React, { Fragment, useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import { get } from '../../../../_helper/utils';
import Highlightable from 'highlightable';
import { useHttp } from '../../../../_helper/http/useHttp';
import { useAuth } from '../../../../Auth/AuthProvider';

const UploadActivityFile = ({activityId, onResponse}) => {
  const [ranges, setRanges] = useState([]);
  const http = useHttp();
  const {token, authConfig} = useAuth();

  const getUploadParams = ({ file, meta }) => {
    console.log('getUploadParams');
    const body = new FormData()
    body.append('file', file)
    return { url: `${http.getBaseUrl()}/api/task-lists/${activityId}/import?${authConfig.tokenParameterName}=${token}`, body }
  };


  const handleChangeStatus = ({ meta, file, xhr, ...rest }, status) => {

    if(status === 'done') {
      onResponse();
    }
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

    </Fragment>
  );
};

export default UploadActivityFile;
