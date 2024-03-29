/**
 * Copyright 2021 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { performLogin, performLogout } from '../../utils';
export default function Header({ loggedIn }) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      const page = event.target.innerText;
      setAnchorEl(false);
      if (page === 'Apps') {
        event.preventDefault();
        router.push('apps');
      } else if (page === 'View Slide Presentations') {
        event.preventDefault();
        router.push('slides');
      } else if (page === 'Links') {
        event.preventDefault();
        router.push('links');
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={(evt) => handleClick(evt)}
            size="large"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClick()}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={(evt) => handleClick(evt)}>Apps</MenuItem>
              <MenuItem onClick={(evt) => handleClick(evt)}>
                View Slide Presentations
              </MenuItem>
              <MenuItem onClick={(evt) => handleClick(evt)}>Links</MenuItem>
            </Menu>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Minneapolis Solid Project
          </Typography>
          {(loggedIn == undefined || loggedIn === '') && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  performLogin();
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                href="https://solidproject.org/users/get-a-pod"
              >
                Get a Solid Pod
              </Button>
            </>
          )}
          {loggedIn !== '' && loggedIn != undefined && (
            <>
              <Typography variant="subtitle1">
                Logged in with webId: {loggedIn}
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  performLogout();
                }}
              >
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
