import styled from '@emotion/styled';
import {
  Table
} from '@mui/material';

const lightBlueBackground = '#e9fcff8f'

export const TableContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.th`
  background: ${lightBlueBackground};
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

export const TableCell = styled.td<{ isEdited?: boolean }>`
  padding: 12px;
  height: 30px;
  border-bottom: 1px solid #ddd;
  background: ${({ isEdited }) => (isEdited ? '#fff9c4' : 'inherit')};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background: #1565c0;
  }
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #1565c0;
  }
  &:disabled {
    background: #b0bec5;
  }
`;

export const StyledMainHeader = styled.h2`
  text-align: center;
  font-size: 2rem;
`;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${lightBlueBackground};
  min-height: 100vh;
`;

export const StyledFormContainer = styled.div`
  border-radius: 8px;
  background-color: ${lightBlueBackground};
  padding: 1rem;
`;

export const StyledFormHeader = styled.h3`
  margin: 1rem 0;
  font-size: 1.7rem;
`;

export const StyledFormInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;
