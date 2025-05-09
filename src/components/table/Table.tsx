import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactNode, useMemo, useState } from "react";

const ALLOWED_ROWS_PER_PAGE = [5] as const;
type RowsPerPageOption = (typeof ALLOWED_ROWS_PER_PAGE)[number];

export interface ColumnDefinition<T> {
  id: keyof T | "actions" | string;
  label: string;
  minWidth?: number;
  format?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface GenericStickyTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  rowKey: keyof T;
  actions?: (row: T) => ReactNode;
  maxHeight?: number;
}

export default function GenericStickyTable<T>({
  columns: propColumns,
  data,
  rowKey,
  actions,
  maxHeight = 440,
}: GenericStickyTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if ((ALLOWED_ROWS_PER_PAGE as readonly number[]).includes(value)) {
      setRowsPerPage(value as RowsPerPageOption);
      setPage(0);
    }
  };

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
      <TableContainer sx={{ maxHeight: maxHeight }}>
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
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={String(row[rowKey]) || `row-${rowIndex}`}
                      sx={{ height: 32 }}
                    >
                      {tableColumns.map((column) => {
                        if (column.id === "actions") {
                          return (
                            <TableCell
                              key={`actions-cell-${String(row[rowKey])}`}
                              align="center"
                              sx={{
                                backgroundColor: "#ECDBF7",
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
                              backgroundColor: "#ECDBF7",
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
        rowsPerPageOptions={ALLOWED_ROWS_PER_PAGE.filter(
          (option) => option === 5 || option > 0
        )}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
