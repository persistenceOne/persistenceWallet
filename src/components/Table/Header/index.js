import {TableCell, TableHead, TableRow} from '@material-ui/core';
import React from 'react';
import Icon from '../../Icon';

const Header = (props) => {
    const onClick = (by, order) => {
        if (props.sort) {
            props.sort(by, !order);
        }
    };

    return (
        <TableHead>
            <TableRow className="table_heading_row">
                {
                    props.columns.map((item) => (
                        <TableCell
                            key={item.id}
                            align={item.numeric ? 'right' : 'left'}
                            padding={item.padding ? 'default' : 'none'}
                            onClick={() => onClick(item.id, props.ascending)}>
                            <div className={props.sortBy ? 'sort_header' : ''}>
                                {item.label}
                                {
                                    item.id === props.sortBy
                                        ? <div className="sort_icon">
                                            {
                                                props.ascending
                                                    ? <Icon
                                                        alt="arrowUp"
                                                        icon="arrowUp"
                                                        title="Ascending"
                                                        viewClass="arrowUp"/>
                                                    : <Icon
                                                        alt="arrowDown"
                                                        icon="arrowDown"
                                                        title="Descending"
                                                        viewClass="arrowDown"/>
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};

export default Header;
