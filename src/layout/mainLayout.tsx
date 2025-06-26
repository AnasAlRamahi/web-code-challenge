import { Container } from "@mui/material";
import { StyledContainer, StyledMainHeader } from "../components/StyledComponents";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <StyledContainer>
      <Container style={{ backgroundColor: 'white' }}>
        <StyledMainHeader>FLIGHT INSPIRATION</StyledMainHeader>
        {children}
      </Container>
    </StyledContainer>
  );
}
