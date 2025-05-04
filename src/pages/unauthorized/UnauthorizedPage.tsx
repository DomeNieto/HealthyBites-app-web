import { Container, Theme, Typography } from "@mui/material";

const UnauthorizedPage = () => {
  return (
    <Container maxWidth={false} disableGutters sx={notFoundPageContainerStyle}>
      <Container maxWidth={false} disableGutters sx={titleContainerStyle}>
        <Typography variant="h4">No autorizado</Typography>
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
};

const titleContainerStyle = (theme: Theme) => ({
  width: "55%",
  margin: 0,
  color: theme.palette.common.black,
});

export default UnauthorizedPage;
