import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import { get } from "../../../_helper/utils";
import Loader from "../../Common/Component/Loader";
import Users from "../Session/show/components/Users";
import { useHttp } from "../../../_helper/http/useHttp";
import { TaskGroup } from "../Activity/show/TaskGroup";
import { Task } from "../Activity/show/Task";
import { Accordion } from "react-bootstrap";


const SessionStudentShow = () => {

    const [session, setSession] = useState();
    const [activity, setActivity] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const http = useHttp();

    useEffect(() => {
        const sessionPromise = http.get(`api/sessions/${id}`).then((data) => {
            console.log(data);
            setSession(data);
        });

        const activityPromise = http.get(`api/sessions/${id}/activity`).then((data) => {
            console.log(data);
            setActivity(data[0]);
        });

        Promise.all([sessionPromise, activityPromise]).then(() => {
            setIsLoading(false);
        });

    }, []);

    if(isLoading){
        return <Loader/>
    }

    return (
        <>
            <Breadcrumbs
                mainTitle={session.name}
            />
            <Container fluid={true}>
                <Row>
                    <Col sm="6">
                        <Users users={session.users}></Users>
                    </Col>
                    <Col sm="12" className="read-only">
                        <Accordion defaultActiveKey={activity.tasks.map(t => t.id)} flush alwaysOpen>
                            {activity.tasks.map((task, index) => (
                                task.label ? <TaskGroup key={index} task={task} readOnly/> : <Task key={index} task={task} readOnly/>
                            ))}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SessionStudentShow;