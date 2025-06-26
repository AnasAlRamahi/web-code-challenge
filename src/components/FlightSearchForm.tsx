import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { memo, useState } from "react";
import { DateInput } from "../components/DateCell";
import {
  FormButton,
  StyledFormContainer,
  StyledFormHeader,
  StyledFormInputsWrapper
} from "../components/StyledComponents";

interface FlightSearchFormProps {
  getData: (cityCode: string, departureDate: string) => void;
  resetSearch: () => void;
}

const StyledTextField = styled(TextField)({
  marginTop: '10px',
  marginBottom: '10px',
  '& .MuiInputBase-input': {
    background: 'transparent',
    padding: '5px',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    '&:before, &:after': {
      display: 'none',
    },
  },
});

export const FlightSearchForm = memo(({ getData, resetSearch }: FlightSearchFormProps) => {
  const [cityCode, setCityCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleGetData = () => {
    getData(cityCode, departureDate);
  };

  const handleResetSearch = () => {
    resetSearch();
    setCityCode('');
    setDepartureDate('');
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement | HTMLDivElement>
  ) => {
    if (e && e.key === "Enter") {
      getData(cityCode, departureDate);
    }
  }

  return (
    <StyledFormContainer>
      <StyledFormHeader>Search Inspirations</StyledFormHeader>
      <StyledFormInputsWrapper>
        <StyledTextField id="cityCodeInput" key="cityCodeInput" label="City Code" variant="outlined" value={cityCode}
          onChange={(e) => setCityCode(e.target.value)} onKeyDown={(e) => handleEnterKey(e)} title={cityCode}
          size="small" fullWidth
        />
        <DateInput
          value={departureDate}
          label="Departure Date"
          onChange={(value) =>
            setDepartureDate(value)
          }
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <FormButton disabled={!cityCode} onClick={() => { handleGetData() }}>Submit</FormButton>
          <FormButton onClick={() => { handleResetSearch() }}>Reset</FormButton>
        </div>
      </StyledFormInputsWrapper>
    </StyledFormContainer>
  );
});
