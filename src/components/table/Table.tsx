import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactNode, useMemo, useState } from "react";

/**
 * ColumnDefinition describes a column in the table.
 *
 * @template T - The type of data for each row.
 * @property {string} id - Unique identifier for the column, or "actions" for the actions column.
 * @property {string} label - The text label shown in the table header.
 * @property {number} [minWidth] - Optional minimum width of the column.
 * @property {(value: T[keyof T], row: T) => React.ReactNode} [format] - Optional function to format cell value.
 */
export interface ColumnDefinition<T> {
  id: "actions" | string;
  label: string;
  minWidth?: number;
  format?: (value: T[keyof T], row: T) => React.ReactNode;
}

/**
 * Props for the GenericStickyTable component.
 *
 * @template T - The type of each data row.
 * @property {ColumnDefinition<T>[]} columns - Array of column definitions.
 * @property {T[]} data - Array of data objects representing table rows.
 * @property {keyof T} rowKey - Key to use as the unique identifier for each row.
 * @property {(row: T) => React.ReactNode} [actions] - Optional function to render action buttons/cells.
 * @property {(row: T) => boolean} [isRowDisabled] - Optional function to determine if a row is disabled.
 */
interface GenericStickyTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  rowKey: keyof T;
  actions?: (row: T) => ReactNode;
  isRowDisabled?: (row: T) => boolean;
}

/**
 * GenericStickyTable renders a paginated, sticky header table with customizable columns and optional actions.
 *
 * @template T - The type of each data row.
 * @param {GenericStickyTableProps<T>} props - Component props.
 * @returns {JSX.Element} A Material-UI styled table with pagination.
 */
export default function GenericStickyTable<T>({
  columns: propColumns,
  data,
  rowKey,
  actions,
  isRowDisabled,
}: GenericStickyTableProps<T>) {
  // State for the current page in pagination
  const [page, setPage] = useState(0);

  /**
   * Handler for page change in pagination.
   * @param _event - Change event (unused)
   * @param newPage - The new selected page number
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Memoized columns array with an additional actions column if actions are provided.
   * This recalculates only if columns or actions change.
   */
  const tableColumns = useMemo(() => {
    const cols = [...propColumns];
    if (actions) {
      cols.push({
        id: "actions",
        label: "Acciones",
        minWidth: 150,
      });
    }
    return cols;
  }, [propColumns, actions]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "rgba(237, 220, 255, 0.3)",
                    border: "1px solid rgba(230, 166, 251, 0.3)",
                  }}
                  align="center"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableColumns.length} align="center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              data.slice(page * 5, page * 5 + 5).map((row) => {
                const disabled = isRowDisabled ? isRowDisabled(row) : false;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={String(row[rowKey])}
                    sx={{ height: 32 }}
                  >
                    {tableColumns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell
                            key={`actions-cell-${String(row[rowKey])}`}
                            align="center"
                            sx={{
                              backgroundColor: disabled
                                ? "rgba(230, 166, 251, 0.2)"
                                : "secondary.main",
                              border: "0.5px  solid rgba(230, 166, 251, 0.3)",
                              py: 1,
                            }}
                          >
                            {actions && actions(row)}
                          </TableCell>
                        );
                      }

                      const value = row[column.id as keyof T];

                      return (
                        <TableCell
                          key={`${String(column.id)}-${String(row[rowKey])}`}
                          align="center"
                          sx={{
                            backgroundColor: disabled
                              ? "rgba(230, 166, 251, 0.2)"
                              : "secondary.main",
                            border: "0.5px solid rgba(230, 166, 251, 0.3)",
                            py: 1,
                          }}
                        >
                          {column.format
                            ? column.format(value, row)
                            : (value as React.ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
        style={{
          border: "0.5px  solid rgba(230, 166, 251, 0.3)",
        }}
      />
    </Paper>
  );
}
