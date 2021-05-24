import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SectionTitle from './SectionTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { TableSortLabel } from '@material-ui/core';

/**
 * TODO: Improvements
 * - Use generic type to represent the row object.
 */

export enum MuiSortOrder {
    Asc = 'asc',
    Desc = 'desc',
}

export interface SortColumnSettings {
    defaultOrder: MuiSortOrder;
    isDefault?: boolean;
}

export type CellFormatter = (row: ScrollTableData, value: unknown) => React.ReactNode;

export interface ScrollTableColumn {
    // Unique identifier for this column
    // This value must point to a property in ScrollTableData. It's used as a key to access that row's column data
    id: string;

    // Column display
    label: string;

    minWidth?: number;
    align?: 'right' | 'left' | 'center';

    // Format data in this column for display
    format?: CellFormatter;

    // Sorting
    sortSettings?: SortColumnSettings;
}

/** Table Row */
export interface ScrollTableData {
    // Unique identifier for this row
    id: string;

    // A reference to the original object that represents this row
    // Useful for onSelectRow events
    originalObject: unknown;

    // Data values (corresponds to table each column)
    // Maps header id (ScrollTableHeader.id) to the column's data
    [key: string]: unknown;
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.white,
        },
    }),
)(TableCell);

const styles = (theme: Theme) =>
    createStyles({
        spinner: { textAlign: 'center', padding: theme.spacing(2) },
        header: { backgroundColor: theme.palette.common.black },
    });

interface ScrollTableProps extends WithStyles<typeof styles> {
    // Required
    columns: ScrollTableColumn[];
    data: ScrollTableData[]; // table rows

    // Styling
    className?: string;
    style?: React.CSSProperties;

    title?: React.ReactNode;
    disableHeader?: boolean;

    isLoading?: boolean;

    onSelectRow?: (selectedRow: ScrollTableData) => void;
    onSelectSort?: (column: ScrollTableColumn, isDesc: boolean) => void;
}

interface ScrollTableState {
    selectedRowIndex?: number;

    // Sorting
    // TODO: Improvement - store sortBy as index of props.columns rather than ScrollTableColumn.id.
    //  - this way we can ensure uniqueness of sortBy values
    sortBy?: string;
    sortDirection?: MuiSortOrder;
}

class RawScrollTable extends React.Component<ScrollTableProps, ScrollTableState> {
    constructor(props: ScrollTableProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        const { isLoading, title } = this.props;

        return (
            <React.Fragment>
                {title != null ? <SectionTitle gutterBottom>{this.props.title}</SectionTitle> : undefined}
                {!isLoading ? this.renderTable() : this.renderSpinner()}
            </React.Fragment>
        );
    }

    private renderSpinner = (): React.ReactNode => {
        const { classes } = this.props;

        return (
            <Box className={classes.spinner}>
                <CircularProgress />
            </Box>
        );
    };

    private renderTable = (): React.ReactNode => {
        const { className, columns, data, style, disableHeader } = this.props;
        const { sortBy, sortDirection } = this.state;

        return (
            <TableContainer className={className} style={style}>
                <Table stickyHeader>
                    {!disableHeader ? (
                        <TableHead>
                            <TableRow>
                                {
                                    // Render column headers
                                    columns.map((column: ScrollTableColumn) => {
                                        const enableColumnSorting: boolean = column.sortSettings != null;

                                        const defaultSortDirection: MuiSortOrder | undefined =
                                            column.sortSettings?.defaultOrder;

                                        // did user click sort on this column?
                                        const sortingActive: boolean = sortBy === column.id;

                                        return (
                                            <StyledTableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {enableColumnSorting ? (
                                                    <TableSortLabel
                                                        active={sortingActive}
                                                        direction={
                                                            sortingActive && sortDirection != null
                                                                ? sortDirection
                                                                : defaultSortDirection
                                                        }
                                                        onClick={this.createSortHandler(column)}
                                                    >
                                                        <b>{column.label}</b>
                                                    </TableSortLabel>
                                                ) : (
                                                    <b>{column.label}</b>
                                                )}
                                            </StyledTableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                    ) : undefined}
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
        );
    };

    private renderDataRow = (row: ScrollTableData, rowIndex: number): React.ReactNode => {
        const { onSelectRow, columns } = this.props;

        const isRowSelected: boolean = rowIndex == this.state.selectedRowIndex;
        return (
            <TableRow
                hover={!!onSelectRow}
                tabIndex={-1}
                key={row.id}
                onClick={() => this.handleRowSelection(row, rowIndex)}
                selected={isRowSelected}
                style={!!onSelectRow ? { cursor: 'pointer' } : undefined} // change cursor on hover
            >
                {
                    // Render each cell of the row
                    columns.map((column: ScrollTableColumn) => {
                        const cellValue: unknown = row[column.id];
                        return (
                            <StyledTableCell key={column.id} align={column.align}>
                                {this.formatCellValue(column, row, cellValue)}
                            </StyledTableCell>
                        );
                    })
                }
            </TableRow>
        );
    };

    private handleRowSelection = (row: ScrollTableData, rowIndex: number) => {
        const { onSelectRow } = this.props;

        if (!onSelectRow) {
            return;
        }

        onSelectRow(row);

        if (rowIndex == this.state.selectedRowIndex) {
            // de-select row
            this.setState({ selectedRowIndex: undefined });
        } else {
            this.setState({ selectedRowIndex: rowIndex });
        }
    };

    private formatCellValue = (
        column: ScrollTableColumn,
        row: ScrollTableData,
        cellValue: unknown,
    ): React.ReactNode => {
        if (column.format) {
            return column.format(row, cellValue);
        }
        return String(cellValue);
    };

    // ===============
    // === Sorting ===
    // ===============
    private createSortHandler = (column: ScrollTableColumn) => {
        return () => this.sortHandler(column);
    };

    private sortHandler = (column: ScrollTableColumn): void => {
        const { sortDirection } = this.state;
        const { onSelectSort } = this.props;

        if (!column.sortSettings) {
            // no sorting settings applied to column
            return;
        }

        // Sort state management
        const currentDirection: MuiSortOrder = sortDirection != null ? sortDirection : column.sortSettings.defaultOrder;
        const reverseDirection: MuiSortOrder =
            currentDirection === MuiSortOrder.Asc ? MuiSortOrder.Desc : MuiSortOrder.Asc;
        this.setState({ sortDirection: reverseDirection, sortBy: column.id });

        // Allow caller to respond to sorting
        if (onSelectSort) {
            onSelectSort(column, reverseDirection == MuiSortOrder.Desc);
        }
    };
}

const ScrollTable = withStyles(styles, { withTheme: true })(RawScrollTable);
export { ScrollTable };
