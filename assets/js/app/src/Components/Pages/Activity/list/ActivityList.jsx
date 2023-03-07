import React, { Fragment, useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Btn, H4 } from '../../../../AbstractElements';
import { get } from '../../../../_helper/utils.js';
// import { dummytabledata, tableColumns } from '../../../../Data/Table/Defaultdata';

const ActivityList = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    // const [data, setData] = useState(dummytabledata);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const [users, setUsers] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        get('task_lists').then((data) => {
        console.log(data);
        setActivities(data['hydra:member']);
        });
    }, []);

    const getRow = (session) => {
        return  {
            name: (
            <Link to={`/app/activity/show/${session.id}`}>
                {session.name}
            </Link>),
            description: session.description,
            steps: session.tasks.lenght,
            date: session.createdAt,
            by: session.createdBy
        }
    };


    const rows = activities.map(getRow);
    const tableColumns =  [
        {
            name: 'Name',
            selector: row => row['name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Description',
            sortable: true,
            center: false,
        },
        {
            name: 'steps',
            sortable: true,
            center: false,
        },
        {
            name: 'date',
            sortable: true,
            center: false,
        },
        {
            name: 'by',
            sortable: true,
            center: false,
        },
    ];



    // const handleDelete = () => {
    //     if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
    //         setToggleDelet(!toggleDelet);

    //         setData(data.filter((item) => selectedRows.filter((elem) => elem.id === item.id).length > 0 ? false : true));
    //         setSelectedRows('');
    //     }
    // };
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
                clearSelectedRows={toggleDelet}
            />
        </Fragment>
    )
}
export default ActivityList