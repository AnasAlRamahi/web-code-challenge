import { DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { memo, useMemo } from 'react';
import { TableData } from '../types/tableTypes';
import { DateInput } from "./DateCell";
import { DraggableTableRow } from "./DraggableTableRow";
import { TableCell } from './StyledComponents';

interface FlightTableBodyProps {
  activeId?: string | null,
  activeRow?: TableData | null,
  columns: string[],
  editedCells: Set<string>,
  updateCell: (rowIndex: number, columnId: string, value: string) => void,
  paginatedData: TableData[],
}

export const FlightTableBody = memo(({ activeId, activeRow, columns, editedCells, updateCell, paginatedData }: FlightTableBodyProps) => {
  const items = useMemo(() => paginatedData?.map((row) => ({ id: row.id })), [paginatedData]);
  const dateCells = ["departureDate", "returnDate"];

  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {paginatedData.map((row: any) => (
        <DraggableTableRow id={row.id} key={row.id} columns={columns}>
          {columns.map((column) => (
            <TableCell
              key={`${row.id}-${column}`}
              isEdited={editedCells.has(`${row.id}-${column}`)}
            >
              {dateCells.includes(column) ? (
                <DateInput
                  value={row[column as keyof TableData]}
                  label={""}
                  onChange={(value) =>
                    updateCell(Number(row.id), column, value)
                  }
                />
              ) : (
                <input
                  id={`${row.id}-${column}-input`}
                  value={row[column as keyof TableData]}
                  title={row[column as keyof TableData]}
                  onChange={(e) =>
                    updateCell(Number(row.id), column, e.target.value)
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    width: "100%",
                    padding: "5px"
                  }}
                />
              )}
            </TableCell>
          ))}
        </DraggableTableRow>
      ))}
      <DragOverlay>
        {activeId && activeRow && (
          <table style={{ width: "100%", backgroundColor: "#fff9c4" }}>
            <tbody>
              <tr key={`${activeId}-overlay`}>
                {columns.map((column) => (
                  <TableCell key={`${activeId}-${column}-overlay`}>
                    {dateCells.includes(column) ? (
                      <DateInput
                        key={`${activeId}-${column}-input`}
                        value={activeRow[column as keyof TableData]}
                        label={""}
                        onChange={() => { }}
                      />
                    ) : (
                      <input
                        id={`overlay-input`}
                        key={`${activeId}-${column}-overlay-input`}
                        value={activeRow[column as keyof TableData]}
                        onChange={() => { }}
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "100%",
                        }}
                      />
                    )}
                  </TableCell>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </DragOverlay>
    </SortableContext>
  );
});
