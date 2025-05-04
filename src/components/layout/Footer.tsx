import { Box, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: 2,
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignSelf={"center"}
      >
        <Grid size={12}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", textAlign: "center" }}
          >
            Desarrollado por:
          </Typography>
        </Grid>
        <Grid size={12}>
          <img
            src="/src/assets/codexLogo.png"
            alt="Desarrollado por Logo"
            style={{
              width: "20%",
              height: "auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
