import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FlightTable } from './components/FlightTable/FlightTable';
import { MainLayout } from "./layout/mainLayout";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainLayout>
        <FlightTable />
      </MainLayout>
    </LocalizationProvider>
  );
}
