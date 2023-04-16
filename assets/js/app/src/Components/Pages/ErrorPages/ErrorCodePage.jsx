import React, { Fragment, useContext } from 'react';
import sad from '../../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';
import { Container, Button, Media, Col } from "reactstrap"
import { BACK_TO_HOME_PAGE } from "../../../Constant";
import { H2, P } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';
import { useAuth } from '../../../Auth/AuthProvider';

const ErrorCodePage = ({code}) => {
    const { layoutURL } = useContext(CustomizerContext);
    const {isStudent, isLogged, studentHome, teacherHome} = useAuth();
    const homePage = !isLogged ? 'home' : isStudent ? studentHome : teacherHome;

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="error-wrapper">
                    <Container>
                        <Media body className="img-100" src={sad} alt="" />
                        <div className="error-heading">
                            <H2 attrH2={{ className: "headline font-info" }} >{code}</H2>
                        </div>
                        <Col md="8 offset-md-2">
                            <P attrPara={{ className: "sub-content" }}>{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</P>
                        </Col>
                        <Link to={`${homePage}`}><Button color="info-gradien" size='lg'>{BACK_TO_HOME_PAGE}</Button></Link>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
};

export default ErrorCodePage;