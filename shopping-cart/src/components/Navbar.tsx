import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <ShoppingCartIcon />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>

          <List>
            <Link to="/category/mensclothing">
              <ListItem>
                <ListItemText primary="Men's clothing" />
              </ListItem>
            </Link>

            <Link to="/category/womenscloting">
              <ListItem>
                <ListItemText primary="Women's clothing" />
              </ListItem>
            </Link>

            <Link to="/products/category/jewellery">
              <ListItem>
                <ListItemText primary="Jewellery" />
              </ListItem>
            </Link>

            <Link to="/products/category/electronics">
              <ListItem>
                <ListItemText primary="Electronics" />
              </ListItem>
            </Link>

            <Link to="/category/shoes">
              <ListItem>
                <ListItemText primary="Shoes" />
              </ListItem>
            </Link>

            <Link to="/category/pants">
              <ListItem>
                <ListItemText primary="Pants" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
