import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import useCustomTheme from '../../hooks/useCustomTheme';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import MyDrawer from './MyDrawer';
import './nav.css'

function HideOnScroll(props) {

    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Navbar(props) {
    const { primary } = useCustomTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { children } = props;
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const pages = <>
        <div className='link font-semibold text-lg'><NavLink to='/'><button className='p-2'>Home</button></NavLink></div>
        <div className='link font-semibold text-lg'><NavLink to='/dash'><button className='p-2'>Home</button></NavLink></div>
        <div className='link font-semibold text-lg'><NavLink to='/dash'><button className='p-2'>Home</button></NavLink></div>
    </>
    // Settings for Profile
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


    return (

        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ backgroundColor: primary.bg }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Grid sx={{
                                display: { xs: 'none', md: 'block' },
                                margin: '5px auto',
                            }}>
                                <Link to='/'>
                                    <img src='/logo.png' className='w-40'></img>
                                </Link>
                            </Grid>


                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                                {/* This is my drawer */}
                                <MyDrawer>
                                    {pages}
                                </MyDrawer>

                            </Box>
                            <Grid sx={{
                                display: { xs: 'block', md: 'none' },
                                margin: '5px auto',
                                flexGrow: 1
                            }}>
                                <Link className='mx-auto' to='/'>
                                    <img src='/logo.png' className='w-40'></img>
                                </Link>
                            </Grid>


                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                {pages}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} sx={{ color: primary.text }} onClick={handleCloseUserMenu}>
                                            <Typography color="text.primary" textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Grid sx={{ mt: 0 }}>
                {children}
            </Grid>

        </React.Fragment>
    );
}
