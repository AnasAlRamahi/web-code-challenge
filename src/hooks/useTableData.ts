import { useState, useEffect, useMemo } from 'react';
import { TableData } from '../types/tableTypes';
import data from '../data.json';
import debounce from 'lodash/debounce';

export const useTableData = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [errorList, setErrorList] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
      getToken();
    } else {
      getToken()
        // getData('MAD');
    }

    // getToken();
  }, []);

  const makeRequest = async ({ url, headers = {}, body = {}, method = 'GET' }: { url: string, headers: Record<string, string>, body: {}, method: string }) => {
    try {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        const urlEncodedBody = new URLSearchParams(body as Record<string, string>).toString();
        body = urlEncodedBody;
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: method !== 'GET' ? (typeof body == "string" ? body : JSON.stringify(body)) : undefined,
      });

      if (!response.ok) {
        setErrorList(prev => [...prev, `HTTP error! status: ${response.status}`]);
      }

      const data = await response.json();

      return data;

    } catch (error) {
      setErrorList(prev => [...prev, `Error making request: ${error}`]);
    }
  }

  const getToken = () => {
    makeRequest({
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        'grant_type': 'client_credentials',
        'client_id': 'WXhVX07Nsuy9MwvkHd1Z2ACwaoTjfUVi',
        'client_secret': 'bo5TGAIJuUDxbgoG',
      },
      method: 'POST',
    }).then(response => {
      localStorage.setItem('accessToken', response.access_token);
    }).catch(error => {
      console.error('Error fetching token:', error);
    });
  }

  const getData = async (code: string, date: string = '') => {
    setErrorList([]);
    // if (!localStorage.getItem('accessToken')) {
    //   await getToken();
    // }
    
    const url = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=' + (code ? code : 'MAD') + (date ? '&departureDate=' + date : '');
    const accessToken = localStorage.getItem('accessToken');

    makeRequest({
      url: url,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.amadeus+json',
        'Content-Type': 'application/vnd.amadeus+json',
      },
      body: {
      },
      method: 'GET',
    }).then(response => {
      const modifiedData = response?.data?.map(({links, ...rest} : any) => ({
        ...rest,
        flightDates: links?.flightDates,
        price: rest.price?.total,
      }) as TableData);
      setTableData(modifiedData as TableData[]);
    }); 
    return data;
  };

  const saveChanges = () => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
    setEditedCells(new Set());
  };

  const updateCell = (rowIndex: number, columnId: string, value: string) => {
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: value,
    };
    setTableData(newData);
    setEditedCells(new Set(editedCells).add(`${rowIndex}-${columnId}`));
  };

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
    getData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    errorList,
  };
};