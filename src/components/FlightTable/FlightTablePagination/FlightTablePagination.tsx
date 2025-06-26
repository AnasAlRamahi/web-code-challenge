import { TablePagination } from '@mui/material';
import { memo } from 'react';
import { TableData } from '../../../types/tableTypes';
import { SaveButton } from '../../common/StyledComponents';

interface FlightTablePaginationProps {
  columns: string[];
  data: TableData[];
  pagination: {
    rowsPerPage: number;
    page: number;
    handleChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
  saveChanges: () => void,
}

export const FlightTablePagination = memo(({ columns, data, pagination, saveChanges }: FlightTablePaginationProps) => {
  return (
    <tr>
      <td colSpan={2}>
        <SaveButton onClick={saveChanges}>Save Changes</SaveButton>
      </td>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={columns.length - 1}
        count={data.length}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={pagination.handleChangePage}
        onRowsPerPageChange={pagination.handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page"
        showFirstButton
        showLastButton
      />
    </tr>
  );
});
