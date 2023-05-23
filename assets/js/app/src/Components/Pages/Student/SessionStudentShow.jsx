import { useEffect, useState, createContext } from "react";
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
import { useAuth } from "../../../Auth/AuthProvider";
import SessionProvider, { TaskStateContext } from "./SessionProvider";


const SessionStudentShow = () => {


    const [activity, setActivity] = useState();
    const [userTasks, setUserTasks] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const http = useHttp();
    const {user} = useAuth();

    const {session, setSession, taskState, setTaskState} = useContext(SessionProvider);


    useEffect(() => {
        const sessionPromise = http.get(`api/sessions/${id}`).then((data) => {
            setSession(data);
        });

        const activityPromise = http.get(`api/sessions/${id}/activity`).then((data) => {
            setActivity(data[0]);
        });

        const tasksPromise = http.get(`/api/sessions/${id}/users/${user.id}/tasks`, { extractHydra: false}).then((data) => {
            console.log(data);
            setTaskState(data);
        });

        Promise.all([sessionPromise, activityPromise, tasksPromise]).then(() => {
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
                            <Accordion defaultActiveKey={activity.taskGroups.map(t => t.id)} flush alwaysOpen>
                                <>
                                    {activity.taskGroups.map((group, index) => (
                                        <TaskGroup key={index} taskGroup={group} session={session} readOnly/>
                                        ))}
                                </>
                            </Accordion>
                        </Col>
                    </Row>

            </Container>
        </>
    )
}

export default SessionStudentShow;