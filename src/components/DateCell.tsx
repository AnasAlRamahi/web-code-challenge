import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';

interface DateCellProps {
  value: string;
  onChange: (value: string) => void;
}

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-input': {
    padding: '0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  '& .MuiInputBase-root': {
    '&:before, &:after': {
      display: 'none',
    },
  },
});

export const DateCell = ({ value, onChange }: DateCellProps) => {
  return (
    <StyledDatePicker
      value={dayjs(value)}
      onChange={(newValue: any) => {
        if (newValue) {
          onChange(newValue.format('YYYY-MM-DD'));
        }
      }}
      slotProps={{
        textField: {
          variant: 'standard',
          fullWidth: true,
        },
      }}
    />
  );
};