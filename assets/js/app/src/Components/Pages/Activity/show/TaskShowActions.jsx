import { Button } from "react-bootstrap"
import { useHttp } from "../../../../_helper/http/useHttp";
import { Btn } from "../../../../AbstractElements";
import { useState } from "react";

const CompletedButton = ({completed, onCompleted}) => {

    if(completed){
        return (
            <Button variant="success" size="sm"  onClick={() => onCompleted(false)}>
                <i className="fa fa-check"></i>
            </Button>
        )
    }else{
        return (
            <Button variant="outline-success" size="sm" onClick={() => onCompleted(true)}>
                <i className="fa fa-check"></i>
            </Button>
        )
    }
}
export const TaskShowActions = ({ task, session }) => {

    const http = useHttp();
    const [completed, setCompleted] = useState(task.userTasks[0].completed);


    const markTaskAsCompleted = (status) => {
        console.log('markTaskAsCompleted');
        http.post(`/api/app/session/${session.id}/task/${task.id}/completed`, {
            completed: status
        }).then((data) => {
            console.log(data);
            setCompleted(completed => !completed);
        });
    }

    return (
        <div className="row">

                <CompletedButton onCompleted={markTaskAsCompleted} completed={completed}/>
        </div>
    )
}