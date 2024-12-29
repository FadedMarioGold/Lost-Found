import React, { useState } from 'react';
import { Button, Menu, MenuItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = window.localStorage.getItem("token");

  // Menu state for dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    // Remove token and navigate to login page
    localStorage.clear();
    window.location.href = "/log-in";
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={3}
      py={2}
      sx={{ backgroundColor: '#F6F8F8' }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dfxpdpbvs/image/upload/v1720181979/Sayhadri-Logo-02.jpg"
          alt="logo"
          style={{ width: '150px' }}
        />
      </Link>

      {/* Navigation Links */}
      <Stack direction="row" gap={3}>
        <Button component={Link} to="/" sx={{ textTransform: 'none' }}>
          Home
        </Button>

        <Button
          onClick={handleClick}
          sx={{ textTransform: 'none' }}
        >
          Items Browser
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/LostItems" onClick={handleClose}>
            Lost Items
          </MenuItem>
          <MenuItem component={Link} to="/FoundItems" onClick={handleClose}>
            Found Items
          </MenuItem>
        </Menu>

        {token && (
          <>
            <Button component={Link} to="/postitem">
              Post Item
            </Button>
            <Button component={Link} to="/mylistings" >
              My Listings
            </Button>
          </>
        )}
      </Stack>

      {/* Authentication Buttons */}
      <Stack direction="row" gap={2}>
        {token ? (
          <Button
            variant="contained"
            onClick={signout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              component={Link}
              to="/log-in"
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/sign-up"
              sx={{ textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Navbar;
