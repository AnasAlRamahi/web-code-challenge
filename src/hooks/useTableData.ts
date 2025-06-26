import debounce from 'lodash/debounce';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchFlightDestinations, getToken } from '../services/tableService';
import staticData from '../staticFlightData.json';
import { TableData } from '../types/tableTypes';

interface UseTableDataProps {
  setPage: Dispatch<SetStateAction<number>>;
}

export const useTableData = ({ setPage }: UseTableDataProps) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [errorList, setErrorList] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    } else {
      setTableData(staticData as TableData[]);
    }

    getToken().then(({ data, error }) => {
      if (error) {
        setErrorList(prev => [...prev, `Error fetching token: ${error}`]);
      } else {
        localStorage.setItem('accessToken', data.access_token);
      }
    });
  }, []);

  const getData = useCallback(
    async (code: string, date: string = '') => {
      setErrorList([]);
      setEditedCells(new Set());

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setErrorList(prev => [...prev, 'No access token found.']);
        return;
      }

      const { data, error } = await fetchFlightDestinations(accessToken, code, date);
      if (error) {
        setErrorList(prev => [...prev, `Error fetching data: ${error}`]);
        setTableData([]);
        return;
      }

      const modifiedData = data?.data?.map(({ links, ...rest }: any, index: number) => ({
        ...rest,
        flightDatesLink: links?.flightDates,
        price: rest.price?.total,
        id: index,
      }) as TableData);

      setTableData(modifiedData as TableData[]);
      setPage(0);
    }, []);

  const resetSearch = useCallback(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    } else {
      setTableData([]);
    }
    setEditedCells(new Set());
    setErrorList([]);
    setPage(0);
  }, []);

  const saveChanges = useCallback(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
    setEditedCells(new Set());
  }, [tableData]);

  const updateCell = useCallback((rowId: number, columnId: string, value: string) => {
    const rowIndex = tableData.findIndex(row => Number(row.id) === rowId);
    if (rowIndex === -1) return;
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: value,
    };
    setTableData(newData);
    setEditedCells(new Set(editedCells).add(`${rowId}-${columnId}`));
  }, [tableData, editedCells]);

  const debouncedFilter = useMemo(
    () =>
      debounce((column: string, value: string) => {
        setColumnFilters((prev) => ({
          ...prev,
          [column]: value,
        }));
      }, 300),
    []
  );

  const filteredData = useMemo(() => {
    return tableData?.filter((row) => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        return row[column as keyof TableData]
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
  }, [tableData, columnFilters]);

  return {
    data: filteredData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    errorList,
    setTableData,
    searchForm: {
      getData,
      resetSearch,
    },
  };
};