import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface DateInputProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
}

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-input': {
    background: 'transparent',
    cursor: 'pointer',
    padding: '5px',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    '&:before, &:after': {
      display: 'none',
    },
  },
});

export const DateInput = ({ value, label, onChange }: DateInputProps) => {
  return (
    <StyledDatePicker
      value={dayjs(value)}
      onChange={(newValue: any) => {
        if (newValue) {
          onChange(newValue.format('YYYY-MM-DD'));
        }
      }}
      label={label}
      slotProps={{
        textField: {
          variant: 'outlined',
          fullWidth: true,
          error: false,
          inputProps: {
            title: value || '',
          },
        },
      }}
    />
  );
};
