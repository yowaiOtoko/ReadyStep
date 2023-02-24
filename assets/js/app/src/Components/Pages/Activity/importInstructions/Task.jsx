import React, { useState, Fragment, useContext } from 'react';
import { toast } from 'react-toastify';


import { H4, H5, LI, UL } from '../../../../AbstractElements';

const Task = ({task, isPreview = false}) => {


  const [status, setStatus] = useState('pending');

  const handleRemoveTodo = (todoId) => {

    toast.success('Deleted Task !');
  };
  const handleMarkedTodo = (itemId, itemStatus) => {
    if (itemStatus === 'completed') {
      setStatus('pending');

      toast.success('Task Completed !');
    } else if (itemStatus === 'pending') {
      setStatus('completed');

      toast.error(' Task In-completed !');
    }
  };

  task.status = 'done';
    task.statusCode = 'success';
    task.date = '12/12/2021';


  return (
    <Fragment>
        <div className='todo'>
                  <div className='todo-list-wrapper'>

        <div className='todo-list-body'>
            <UL attrUL={{ className: 'simple-list', id: 'todo-list' }}>
                <LI attrLI={{ className: 'task border-0 ' + task.status }} >
                    <div className='task-container'>
                        <div  className= 'task-label' style={{whiteSpace: "pre-wrap"}}>{task.content}</div>
                        {isPreview && <div className='d-flex align-items-center gap-4'>
                            <span className={`badge badge-light-${task.statusCode}`}>{task.status}</span>
                            <H5 attrH5={{ className: 'assign-name m-0' }}>{task.date}</H5>
                            <span className='task-action-btn'>
                            <span className='action-box large delete-btn' title='Delete Task' onClick={() => handleRemoveTodo(task.id)}>
                                <i className='icon'>
                                <i className='icon-trash'></i>
                                </i>
                            </span>
                            <span className='action-box large complete-btn' title='Mark Complete' onClick={() => handleMarkedTodo(task.id, status)}>
                                <i className='icon'>
                                <i className='icon-check'></i>
                                </i>
                            </span>
                            </span>
                        </div>}
                    </div>
                </LI>
            </UL>
        </div>
        </div>

        </div>
    </Fragment>
  );
};
export default Task;
