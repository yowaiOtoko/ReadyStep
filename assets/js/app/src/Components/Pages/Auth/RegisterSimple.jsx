
import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { post } from '../../../_helper/utils';
import RegisterFrom from './RegisterFrom';
import { useAuth } from '../../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const RegisterSimple = () => {

  console.log('register simple')

  const {register} = useAuth();
  const history = useNavigate();

  useEffect(() => {

  }, []);

  const createUser = (email, password, firstName, lastName) => {

    register({
      firstName,
      lastName,
      email,
      password
    }).then((response) => {
        console.log(response);
        history('/');
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }


  return (
    <Fragment>
      <section>
        <Container fluid={true} className='p-0'>
          <Row className='m-0'>
            <Col className='p-0'>
              <RegisterFrom onCreateUser={createUser} />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default RegisterSimple;
