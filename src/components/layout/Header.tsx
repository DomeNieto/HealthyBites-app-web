import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const titles: titleProps[] = [
    {
      link: "/home",
      name: "Gestor KPI",
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
    <Box sx={{ p: 4 }}>
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
