import React, { Fragment, useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Btn, H4 } from '../../../../AbstractElements';
import { get, del, post } from '../../../../_helper/utils.js';
import { useNavigate } from 'react-router';
import { useHttp } from '../../../../_helper/http/useHttp';
// import { dummytabledata, tableColumns } from '../../../../Data/Table/Defaultdata';

const SessionList = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const history = useNavigate();
    const http = useHttp();

    // const [data, setData] = useState(dummytabledata);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const [users, setUsers] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        http.get('/api/sessions').then((data) => {
        console.log(data);
        setActivities(data);
        });
    }, []);

    const onStartSession = (sessionId) => {
        http.post(`api/session/${sessionId}/start`).then((data) => {
            history(`/app/session/show/${sessionId}`);
            console.log(data);
        })

    }

    const getRow = (session) => {
        return  {
            name: (
            <Link to={`/app/session/show/${session.id}`}>
                {session.name}
            </Link>),
            description: session.description,
            steps: session.tasks?.length ? session.tasks.length : '-',
            date: session.createdAt,
            by: session.createdBy,
            actions: (
                <div className="d-flex justify-content-center">
                    <Button onClick={() => onStartSession(session.id)} className="btn btn-sm btn-primary me-2 ">
                        { session.isPaused ? 'Reprendre' : 'Commencer'}
                    </Button>
                    <Button color="danger" outline onClick={()=> { setDeleteId(session.id); setToggleDelete(true)}} className="btn btn-sm">Supp</Button>
                </div>
            ),

        }
    };

    const onDelete = () => {
        console.log(deleteId);
        setToggleDelete(false);
        del(`activities/${deleteId}`).then(() => {

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

        </Fragment>
    )
}
export default SessionList