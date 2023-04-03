import {Paper, Table as MaterialTable, TableBody} from '@material-ui/core';
import React from 'react';
import Loader from '../Loader';
import NoData from '../NoData';
import Header from './Header';
import './index.css';

const Table = (props) => {
    return (
        <div className="table_section">
            <div className="table_div">
                <Paper className="table_back table_one">
                    <div className="table_top scroll_bar" onScroll={props.onScroll}>
                        <MaterialTable aria-labelledby="tableTitle">
                            <Header
                                ascending={props.ascending}
                                columns={props.config.columns}
                                sort={props.sort}
                                sortBy={props.sortBy}/>
                            <TableBody>
                                {
                                    props.loading && !props.rows.length
                                        ? <div className="loader_section">
                                            <Loader/>
                                        </div>
                                        : (
                                            props.rows.length
                                                ? props.rows.map((row, index, array) =>
                                                    props.rowComponent(row, index,
                                                        props.config.name === 'Power Change'
                                                            ? array
                                                            : props.network))
                                                : <NoData/>
                                        )
                                }
                            </TableBody>
                        </MaterialTable>
                    </div>
                </Paper>
            </div>
        </div>
    );
};


export default Table;
