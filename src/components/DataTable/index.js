import MUIDataTable from 'mui-datatables';
import React from 'react';

const DataTable = (props) => {
    return (
        <MUIDataTable
            columns={props.columns}
            data={props.data}
            options={props.options}
            title={props.name}/>
    );
};

export default DataTable;
