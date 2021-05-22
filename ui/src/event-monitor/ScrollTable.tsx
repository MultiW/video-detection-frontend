import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

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

    // A reference to the original object that represents this row
    // Useful for onSelectRow events
    originalObject?: unknown;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        spinner: { textAlign: 'center', padding: theme.spacing(2) },
    });

interface ScrollTableProps extends WithStyles<typeof styles> {
    columns: ScrollTableColumn[];
    data: ScrollTableData[]; // table rows

    height?: string;

    isLoading?: boolean;

    onSelectRow?: (selectedRow: ScrollTableData) => void;
}

interface ScrollTableState {
    selectedRowIndex?: number;
}

class RawScrollTable extends React.Component<ScrollTableProps, ScrollTableState> {
    constructor(props: ScrollTableProps) {
        super(props);

        this.state = {
            selectedRowIndex: undefined,
        };
    }

    render(): React.ReactNode {
        const { classes, columns, data, height, isLoading } = this.props;

        return (
            <Paper className={classes.root}>
                {isLoading ? (
                    <TableContainer style={{ height: height }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        // Render column headers
                                        columns.map((column: ScrollTableColumn) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                <b>{column.label}</b>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    // Render rows
                                    data.map((data: ScrollTableData, rowIndex: number) => {
                                        return this.renderDataRow(data, rowIndex);
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box className={classes.spinner}>
                        <CircularProgress />
                    </Box>
                )}
            </Paper>
        );
    }

    private renderDataRow = (row: ScrollTableData, rowIndex: number): React.ReactNode => {
        const isRowSelected: boolean = rowIndex == this.state.selectedRowIndex;
        return (
            <TableRow
                hover={!!this.props.onSelectRow}
                tabIndex={-1}
                key={row.id}
                onClick={() => this.handleRowSelection(row, rowIndex)}
                selected={isRowSelected}
            >
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

    private handleRowSelection = (row: ScrollTableData, rowIndex: number) => {
        const { onSelectRow } = this.props;

        if (onSelectRow) {
            onSelectRow(row);
        }

        if (rowIndex == this.state.selectedRowIndex) {
            // de-select row
            this.setState({ selectedRowIndex: undefined });
        } else {
            this.setState({ selectedRowIndex: rowIndex });
        }
    };

    private formatCellValue = (column: ScrollTableColumn, cellValue: unknown): React.ReactNode => {
        if (column.format) {
            return column.format(cellValue);
        }
        return String(cellValue);
    };
}

const ScrollTable = withStyles(styles, { withTheme: true })(RawScrollTable);
export { ScrollTable };
