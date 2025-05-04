import { Container, Theme, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth={false} disableGutters sx={notFoundPageContainerStyle}>
      <Container maxWidth={false} disableGutters sx={titleContainerStyle}>
        <Typography variant="h4">Home</Typography>
      </Container>
    </Container>
  );
};

const notFoundPageContainerStyle = {
  flexGrow: 1,
  width: "100%",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f1f1",
};

const titleContainerStyle = (theme: Theme) => ({
  width: "55%",
  margin: 0,
  color: theme.palette.common.black,
});

export default HomePage;
