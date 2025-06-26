jest.mock('../../../src/components/common/DateCell', () => ({
  DateInput: (props: any) => (
    <input
      aria-label={props.label}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  ),
}));

jest.mock('../../../src/components/common/StyledComponents', () => ({
  FormButton: (props: any) => <button {...props} />,
  StyledFormContainer: (props: any) => <form {...props} />,
  StyledFormHeader: (props: any) => <div {...props} />,
  StyledFormInputsWrapper: (props: any) => <div {...props} />,
}));

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FlightSearchForm } from '../../../src/components/FlightTable/FlightSearchForm/FlightSearchForm';

describe('FlightSearchForm', () => {
  it('renders the form fields', () => {
    render(
      <FlightSearchForm getData={() => { }} resetSearch={() => { }} />
    );
    expect(screen.queryByLabelText(/city code/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/departure date/i)).toBeInTheDocument();
    expect(screen.queryByText(/submit/i)).toBeInTheDocument();
    expect(screen.queryByText(/reset/i)).toBeInTheDocument();
  });

  it('calls getData with correct values on submit', () => {
    const getDataMock = jest.fn();
    render(
      <FlightSearchForm getData={getDataMock} resetSearch={() => { }} />
    );
    fireEvent.change(screen.getByLabelText(/city code/i), { target: { value: 'MAD' } });
    fireEvent.change(screen.getByLabelText(/departure date/i), { target: { value: '2025-09-01' } });
    fireEvent.click(screen.getByText(/submit/i));
    expect(getDataMock).toHaveBeenCalledWith('MAD', '2025-09-01');
  });

  it('calls resetSearch and clears fields on reset', () => {
    const resetSearchMock = jest.fn();
    render(
      <FlightSearchForm getData={() => { }} resetSearch={resetSearchMock} />
    );
    const cityInput = screen.getByLabelText(/city code/i);
    fireEvent.change(cityInput, { target: { value: 'MAD' } });
    fireEvent.click(screen.getByText(/reset/i));
    expect(resetSearchMock).toHaveBeenCalled();
    expect(cityInput).toHaveValue('');
  });

  it('submits on Enter key in city code input', () => {
    const getDataMock = jest.fn();
    render(
      <FlightSearchForm getData={getDataMock} resetSearch={() => { }} />
    );
    const cityInput = screen.getByLabelText(/city code/i);
    fireEvent.change(cityInput, { target: { value: 'BOS' } });
    fireEvent.keyDown(cityInput, { key: 'Enter', code: 'Enter' });
    expect(getDataMock).toHaveBeenCalledWith('BOS', '');
  });
});

