import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface ScrollTableColumn {
    // Unique identifier for this column
    // This value must point to a property in ScrollTableData. It's used as a key to access that row's column data
    id: string;

    // Column display
    label: string;

    minWidth?: number;
    align?: 'right';

    // Format data in this column for display
    format?: (value: unknown) => React.ReactNode;
}

/** Table Row */
export interface ScrollTableData {
    // Unique identifier for this row
    id: string;

    // Data values (corresponds to table each column)
    // Maps header id (ScrollTableHeader.id) to the column's data
    [key: string]: unknown;
}

const styles = createStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

interface ScrollTableProps extends WithStyles<typeof styles> {
    columns: ScrollTableColumn[];
    data: ScrollTableData[]; // table rows
}

interface ScrollTableState {}

class RawScrollTable extends React.Component<ScrollTableProps, ScrollTableState> {
    constructor(props: ScrollTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Paper className={this.props.classes.root}>
                <TableContainer className={this.props.classes.container}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {
                                    // Render column headers
                                    this.props.columns.map((column: ScrollTableColumn) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // Render rows
                                this.props.data.map((data: ScrollTableData) => {
                                    return this.renderDataRow(data);
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }

    private renderDataRow = (row: ScrollTableData): React.ReactNode => {
        return (
            <TableRow hover tabIndex={-1} key={row.id}>
                {
                    // Render each cell of the row
                    this.props.columns.map((column: ScrollTableColumn) => {
                        const cellValue: unknown = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {this.formatCellValue(column, cellValue)}
                            </TableCell>
                        );
                    })
                }
            </TableRow>
        );
    };

    private formatCellValue = (column: ScrollTableColumn, cellValue: unknown): React.ReactNode => {
        if (column.format) {
            return column.format(cellValue);
        }
        return String(cellValue);
    };
}

const ScrollTable = withStyles(styles)(RawScrollTable);
export { ScrollTable };
