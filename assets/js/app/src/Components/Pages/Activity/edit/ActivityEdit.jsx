import { Fragment } from "react";
import { PlusCircle } from "react-feather";
import { Breadcrumbs, Btn } from '../../../../AbstractElements';
import ProjectContext from '../../../../_helper/Project';
import { Add, Cancel } from '../../../../Constant';
import ActivityTitleRow from './components/ActivityTitleRow';
import ClientNameClass from './components/ClientName';
import ProjectRateClass from './components/ProjectRate';
import IssueClass from './components/IssueClass';
import DescriptionRow from './components/EnterSomeDetails';
import UploadActivityFileRow from './components/UploadActivityFileRow';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, CardBody, Form, CardHeader } from 'reactstrap';
import CustomizerContext from '../../../../_helper/Customizer';
import { post } from "../../../../_helper/utils";

const ActivityEdit = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const history = useNavigate();



    const AddProject = (data) => {
        if (data !== '') {


            post('activities', data).then(data => {
                console.log(data)
                history(`/app/activity/list`);
            })
            console.log(data)
            //project.addNewProject(data);
            // history(`${process.env.PUBLIC_URL}/app/project/project-list/${layoutURL}`);
        } else {
            errors.showMessages();
        }
    };

    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Nouvelle activité"
                parent="Pages"
                title="Activités"
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>

                            </CardHeader>
                            <CardBody>
                            <Form className='theme-form' onSubmit={handleSubmit(AddProject)}>
                                <ActivityTitleRow register={register} errors={errors} />
                                <DescriptionRow register={register} errors={errors} />

                                <UploadActivityFileRow register={register} errors={errors} />
                                <Row>
                                    <Col>
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: 'success', className: 'me-3' }}>{Add}</Btn>
                                        <Link to={`${process.env.PUBLIC_URL}/app/project/project-list`}>
                                        <Btn attrBtn={{ color: 'danger' }}>{Cancel}</Btn>
                                        </Link>
                                    </div>
                                    </Col>
                                </Row>
                            </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ActivityEdit;
