import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { DateCell } from "./components/DateCell";
import {
  SaveButton,
  SearchInput,
  StyledTable,
  SubmitButton,
  TableCell,
  TableContainer,
  TableHeader,
} from "./components/StyledComponents";
import { useTableData } from "./hooks/useTableData";
import { TableData } from "./types/tableTypes";

export default function App() {
  const { data, getData, editedCells, updateCell, saveChanges, debouncedFilter, errorList } =
    useTableData();
  const columns = Object.keys(data?.[0] || {});
  const dateCells = ["departureDate", "returnDate"];
  const [cityCode, setCityCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleGetData = () => {
    getData(cityCode, departureDate);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (e && e.key === "Enter") {
      getData(cityCode, departureDate);
    }
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ width: "100%" }}>
          <div>
            <label>
              City Code
            </label>
            <input
              type="text"
              placeholder="Enter city code"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e)}
              style={{ border: 'none', background: 'trasparent', width: "100%" }} />
          </div>
          <div>
            <label>
              Departure Date
            </label>
            <DateCell
              value={departureDate}
              onChange={(value) =>
                setDepartureDate(value)
              }
            />
            {/* <input
              type="text"
              placeholder="Enter departure date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              onKeyDown={(e) => handleGetData(true, e)}
              style={{ border: 'none', background: 'trasparent', width: "100%" }} /> */}
          </div>
          <SubmitButton disabled={!cityCode} onClick={() => {handleGetData()}}>Submit</SubmitButton>
        </div>
        
        <TableContainer>
          {errorList.length > 0 && (
            <div>
              No data found.
            </div>
          )}
          {columns.length > 0 && (
            <>
              <SaveButton onClick={saveChanges}>Save Changes</SaveButton>
              <StyledTable>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <TableHeader key={column}>
                        {column}
                        <SearchInput
                          placeholder={`Search ${column}...`}
                          onChange={(e) => debouncedFilter(column, e.target.value)}
                        />
                      </TableHeader>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell
                          key={`${rowIndex}-${column}`}
                          isEdited={editedCells.has(`${rowIndex}-${column}`)}
                        >
                          {dateCells.includes(column) ? (
                            <DateCell
                              value={row[column as keyof TableData]}
                              onChange={(value) =>
                                updateCell(rowIndex, column, value)
                              }
                            />
                          ) : (
                            <input
                              value={row[column as keyof TableData]}
                              onChange={(e) =>
                                updateCell(rowIndex, column, e.target.value)
                              }
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
                  ))}
                </tbody>
              </StyledTable>
            </>
          )}
        </TableContainer>
      </LocalizationProvider>
  );
}
