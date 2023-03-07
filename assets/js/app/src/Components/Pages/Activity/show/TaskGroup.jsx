import { Task } from "./Task";

export const TaskGroup = ({ task }) => {

    return (
        <>
            <h5 className="task__title">{task.label} </h5>{" "}
            { task.description && <pre className="task__description">{task.description} </pre>
            }
            {task.tasks && task.tasks.map((task, index) => (
                task.label ? <TaskGroup key={index} task={task}/> : <Task key={index} task={task}/>
            ))}
        </>
    );
};
