import { CircularProgress, Container } from "@mui/material";

// SpinnerIsLoading component renders a full-screen centered loading spinner.
const SpinnerIsLoading = () => {
  return (
    <Container maxWidth={false} disableGutters sx={mainContainerStyle}>
      <CircularProgress color="primary" size={40} />
    </Container>
  );
};

const mainContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default SpinnerIsLoading;
