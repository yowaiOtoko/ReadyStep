import React, { Fragment, useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Btn, H4 } from '../../../../AbstractElements';
import { useHttp } from '../../../../_helper/http/useHttp';


import DeleteModal from './DeleteModal';
// import { dummytabledata, tableColumns } from '../../../../Data/Table/Defaultdata';

const ActivityList = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const http = useHttp();

    // const [data, setData] = useState(dummytabledata);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const [users, setUsers] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        http.get('/api/activities').then((data) => {
        console.log(data);
        setActivities(data);
        });
    }, []);

    const onNewSession = (sessionId) => {
        http.post(`/app/activity/${sessionId}/new-session`).then((data) => {
            console.log(data);
        })

    }

    const getRow = (activity) => {
        return  {
            name: (
            <Link to={`/teach/activity/show/${activity.id}`}>
                {activity.name}
            </Link>),
            description: activity.description,
            steps: activity.tasks?.length ? activity.tasks.length : '-',
            date: activity.createdAt,
            by: activity.creatorName,
            actions: (
                <div className="d-flex justify-content-center">
                    <Button onClick={() => onNewSession(activity.id)} className="btn btn-sm btn-primary me-2 ">Commencer</Button>
                    <Button color="danger" outline onClick={()=> { setDeleteId(activity.id); setToggleDelete(true)}} className="btn btn-sm">Supp</Button>
                </div>
            ),

        }
    };

    const onDelete = () => {
        console.log(deleteId);
        setToggleDelete(false);
        http.del(`/api/activities/${deleteId}`).then(() => {

            setActivities(activities.filter((activity) => activity.id !== deleteId));
        })
    }


    const rows = activities.map(getRow);

    console.log(rows)
    const tableColumns =  [
        {
            name: 'Name',
            selector: row => row['name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Description',
            selector: row => row['description'],
            sortable: true,
            center: false,
        },
        {
            name: 'steps',
            sortable: true,
            selector: row => row['steps'],
            center: false,
        },
        {
            name: 'date',
            sortable: true,
            selector: row => row['date'],
            center: false,
        },
        {
            name: 'by',
            sortable: true,
            selector: row => row['by'],
            center: false,
        },
        {
            name: 'actions',
            sortable: false,
            selector: row => row['actions'],
            center: false,
        },
    ];


    return (
        <Fragment>
            {(selectedRows.length !== 0) &&
                <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Delet Selected Data..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: () => {} }}>Delete</Btn>
                </div>
            }
            <DataTable
                data={rows}
                columns={tableColumns}
                striped={true}
                center={true}
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleDelete}
            />
            <DeleteModal
                onDelete={onDelete}
                isOpen={toggleDelete}
                toggler={() => setToggleDelete(!toggleDelete)}

                />
        </Fragment>
    )
}
export default ActivityList