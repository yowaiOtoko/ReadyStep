import React, { Fragment } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { UploadProjectFile } from '../../../../../Constant';
import Dropzone from 'react-dropzone-uploader';

const UploadActivityFileRow = ({ register }) => {

  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label>{UploadProjectFile}</Label>
            <input type="file" name="instruction_file"/>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UploadActivityFileRow;
