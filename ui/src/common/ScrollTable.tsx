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
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import FilterListIcon from '@material-ui/icons/FilterList';
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
        spinner: {
            textAlign: 'center',
            padding: theme.spacing(2),
        },
        header: {
            backgroundColor: theme.palette.common.black,
        },
    });

interface ScrollTableProps extends WithStyles<typeof styles> {
    // Required
    columns: ScrollTableColumn[];
    data: ScrollTableData[]; // table rows

    // Styling
    className?: string;
    style?: React.CSSProperties;

    // Customization
    title?: React.ReactNode;
    disableHeader?: boolean;

    isLoading?: boolean;

    onSelectRow?: (selectedRowIndex?: number) => void;
    selectedRowIndex?: number;

    onSelectSort?: (column: ScrollTableColumn, isDesc: boolean) => void;

    // Filtering
    onClickFilter?: () => void;
    isFilterApplied?: boolean;
}

interface ScrollTableState {
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
        const { isLoading } = this.props;

        return (
            <React.Fragment>
                {this.renderToolbar()}
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

    private renderToolbar = (): React.ReactNode => {
        const { title, isFilterApplied, onClickFilter } = this.props;

        if (title == null) {
            return;
        }

        return (
            <Toolbar disableGutters>
                <SectionTitle>{this.props.title}</SectionTitle>
                <Tooltip title="Filter list">
                    <IconButton onClick={onClickFilter}>
                        <Badge color={isFilterApplied ? 'primary' : undefined} variant="dot">
                            <FilterListIcon color={isFilterApplied ? 'primary' : undefined} />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        );
    };

    // ========================
    // === Main Table Logic ===
    // ========================

    private renderTable = (): React.ReactNode => {
        const { className, columns, data, style, disableHeader } = this.props;
        const { sortBy, sortDirection } = this.state;

        return (
            <TableContainer className={className} style={style}>
                <Table stickyHeader>
                    {!disableHeader ? (
                        <TableHead>
                            <TableRow>
                                {columns.map((column: ScrollTableColumn) => {
                                    const enableColumnSorting: boolean = column.sortSettings != null;

                                    const defaultSortDirection: MuiSortOrder | undefined =
                                        column.sortSettings?.defaultOrder;

                                    // did user click sort on this column?
                                    const sortingActive: boolean = sortBy === column.id;

                                    // Render column label and sorting button
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
                                })}
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
        const { onSelectRow, columns, selectedRowIndex } = this.props;

        const isRowSelected: boolean = rowIndex == selectedRowIndex;
        return (
            <TableRow
                hover={!!onSelectRow}
                tabIndex={-1}
                key={row.id}
                onClick={() => this.handleRowSelection(rowIndex)}
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

    private handleRowSelection = (newRowIndex: number) => {
        const { onSelectRow, selectedRowIndex } = this.props;

        if (onSelectRow == null) {
            return;
        }

        if (newRowIndex == selectedRowIndex) {
            // de-select row
            onSelectRow();
        } else {
            onSelectRow(newRowIndex);
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
