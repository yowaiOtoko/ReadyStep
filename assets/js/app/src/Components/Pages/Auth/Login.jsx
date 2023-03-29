import React, { Fragment } from 'react';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import { useAuth } from '../../../Auth/AuthProvider';
import LoginForm from './LoginForm';

const Login = () => {

    console.log('login')
    const {login } = useAuth();
    const history = useNavigate();

    const onLogin = (email, password) => {
        login(email, password).then(response => {
            if(response.success){
                history('/');
            }
        })
    }

    return (
        <Fragment>
            <Container fluid={true} className="p-0">
                <Row>
                    <Col>
                        <LoginForm onLogin={onLogin}/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Login;