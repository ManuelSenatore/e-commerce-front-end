import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import papyrus from "../img/papyrus.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarrelloList,
  getPreferitiList,
  getProdottoList,
} from "../redux/actions/actions";
import { useEffect } from "react";
import SearchBarComponent from "./SearchBarComponent";
import DialogLogoutComponent from "./DialogLogoutComponent";

// NAV BAR DELLA PAGINA

export default function NavBarComponents() {
  const user = useSelector((state) => state.user.user);
  const preferitiList = useSelector((state) => state.preferiti.preferitiList);
  const carrelloList = useSelector((state) => state.carrello.carrelloList);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Proprietà del modale
  const [dialogEliminazioneFlag, setDialogEliminazioneFlag] =
    React.useState(false);

  const handleClickOpen = () => {
    setDialogEliminazioneFlag(true);
  };

  const handleClickClose = () => {
    setDialogEliminazioneFlag(false);
  };


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getPreferitiList(token, user.id));
    dispatch(getCarrelloList(token, user.id));
    dispatch(getProdottoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {token && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
              setDialogEliminazioneFlag(true);
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/account");
            }}
          >
            My Account
          </MenuItem>
        </Menu>
      )}
      {token === undefined && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/login");
            }}
          >
            Accedi
          </MenuItem>
        </Menu>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/wishlist");
        }}
      >
        <IconButton size="large" aria-label="" color="inherit">
          <Badge
            badgeContent={
              location.pathname === "/login" || location.pathname === "/signup"
                ? 0
                : preferitiList.length
            }
            color="error"
          >
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Preferiti</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/carrello");
        }}
      >
        <IconButton size="large" aria-label="" color="inherit">
          <Badge
            badgeContent={
              location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "payment/success"
                ? 0
                : carrelloList.cartItems.length
            }
            color="error"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrello</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DialogLogoutComponent
        dialogEliminazioneFlag={dialogEliminazioneFlag}
        handleClose={handleClickClose}
      />
      <AppBar className="navBar" sticky="top">
        <Toolbar>
          {/*  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/">
            <img className="logo" src={papyrus} alt="logo" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{fontFamily: 'fantasy'}}
          >
            PAPYRUS
          </Typography>
          <SearchBarComponent />
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
            <IconButton
              onClick={() => {
                navigate("/wishlist");
              }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={
                  location.pathname === "/login" ||
                  location.pathname === "/signup"
                    ? 0
                    : preferitiList.length
                }
                color="error"
              >
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/carrello");
              }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={
                  location.pathname === "/login" ||
                  location.pathname === "/signup" ||
                  location.pathname === "payment/success"
                    ? 0
                    : carrelloList.cartItems.length
                }
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
