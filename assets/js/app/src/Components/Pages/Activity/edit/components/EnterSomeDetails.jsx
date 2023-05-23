import React, { Fragment } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { EnterSomeDetails } from '../../../../../Constant';

const DescriptionRow = ({ register, errors }) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label>Description</Label>
            <textarea className='form-control' name='description' rows='3' {...register('description', { required: false })} />
            <span style={{ color: 'red' }}>{errors.description && 'Some Details is required'}</span>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DescriptionRow;
