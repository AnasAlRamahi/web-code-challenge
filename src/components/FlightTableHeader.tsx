import { memo } from 'react';
import { camelCaseToNormalText } from '../utils/utils';
import { SearchInput, TableHeader } from './StyledComponents';

interface FlightTableHeaderProps {
  columns: string[];
  debouncedFilter: (column: string, value: string) => void;
}

export const FlightTableHeader = memo(({ columns, debouncedFilter }: FlightTableHeaderProps) => {
  return (
    <tr>
      <TableHeader />
      {columns.map((column, index) => (
        <TableHeader key={index + 1}>
          {camelCaseToNormalText(column)}
          <SearchInput
            placeholder={`Search ${camelCaseToNormalText(column)}`}
            onChange={(e) => debouncedFilter(column, e.target.value)}
            style={{ width: '90%' }}
          />
        </TableHeader>
      ))}
    </tr>
  );
});
