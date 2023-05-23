import React, { Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import { useAuth } from '../../../Auth/AuthProvider';
import LoginForm from './LoginForm';

const Login =  () => {

    const {login, isStudent, isTeacher, studentHome, teacherHome, token, isLogged } = useAuth();
    const history = useNavigate();

    const onLogin = ({email, password}) => {
        login(email, password)
    }

    return (
        <Fragment>
            <Container fluid={true} className="p-0">
                <Row>
                    <Col>
                        <LoginForm onLogin={onLogin}/>
                        { isLogged && isTeacher && <Navigate to={teacherHome}/>}
                        { isLogged && isStudent && <Navigate to={studentHome}/>}

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Login;