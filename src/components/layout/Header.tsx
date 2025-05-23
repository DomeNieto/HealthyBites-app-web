import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

// All headers to the app
const Header = () => {
  const location = useLocation();

  const titles: titleProps[] = [
    {
      link: "/home",
      name: "Cuadro de mando",
    },
    {
      link: "/users",
      name: "Gestión de Usuarios",
    },
    {
      link: "/recipes/user",
      name: "Recetas de usuario",
    },
    {
      link: "/ingredients",
      name: "Gestión de Ingredientes",
    },
    {
      link: "/advices",
      name: "Consejos Nutricionales",
    },
  ];

  const getTitle = () => {
    if (/^\/users\/[^/]+$/.test(location.pathname)) {
      return "";
    }

    const title = titles.find((title) =>
      location.pathname.startsWith(title.link)
    );
    return title ? title.name : "";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2">
        {getTitle()}
      </Typography>
    </Box>
  );
};

interface titleProps {
  link: string;
  name: string;
}

export const navbarHeight = 64;

export default Header;
