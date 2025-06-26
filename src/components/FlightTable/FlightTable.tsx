import {
  closestCenter,
  DndContext
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { TableContainer } from "@mui/material";
import { useMemo } from "react";
import { useTableData } from "../../hooks/useTableData";
import { useTableDnD } from "../../hooks/useTableDnD";
import { useTablePagination } from "../../hooks/useTablePagination";
import { FlightSearchForm } from "./FlightSearchForm/FlightSearchForm";
import { FlightTableBody } from "./FlightTableBody/FlightTableBody";
import { FlightTableHeader } from "./FlightTableHeader/FlightTableHeader";
import { FlightTablePagination } from "./FlightTablePagination/FlightTablePagination";
import { StyledTable } from "../common/StyledComponents";

export const FlightTable = () => {
  const { pagination } = useTablePagination();
  const { data, editedCells, updateCell, saveChanges,
    debouncedFilter, errorList, setTableData, searchForm } = useTableData({ setPage: pagination.setPage });
  const { activeId, selectedRow, sensors, handleDragStart, handleDragEnd, handleDragCancel } = useTableDnD({ data });

  const columns = ['type', 'origin', 'destination', 'departureDate', 'returnDate', 'price', 'flightDatesLink'];

  const handleDragEndWithState = handleDragEnd(setTableData);

  const paginatedData = useMemo(() => {
    return pagination.rowsPerPage > 0 ? data?.slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage) : data;
  }, [data, pagination.page, pagination.rowsPerPage]);

  return (
    <>
      <FlightSearchForm getData={searchForm.getData} resetSearch={searchForm.resetSearch} />
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEndWithState}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
      >
        <TableContainer style={{ marginTop: '2rem' }}>
          {errorList.length > 0 && data.length === 0 && (
            <div style={{ margin: '1rem'}}>
              No data found.
            </div>
          )}
          <>
            <StyledTable>
              <thead>
                <FlightTableHeader columns={columns} debouncedFilter={debouncedFilter} />
              </thead>
              <tbody>
                {data.length > 0 && (
                  <FlightTableBody columns={columns} editedCells={editedCells} updateCell={updateCell}
                    paginatedData={paginatedData} activeId={activeId} activeRow={selectedRow} />
                )}
              </tbody>
              <tfoot>
                <FlightTablePagination columns={columns} data={data} pagination={pagination} saveChanges={saveChanges} />
              </tfoot>
            </StyledTable>
          </>
        </TableContainer>
      </DndContext>
    </>
  );
};
