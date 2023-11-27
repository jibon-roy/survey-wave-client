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
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import useAuthProvider from '../../hooks/useAuthProvider';
import useRole from '../../hooks/useRole';


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
    const role = useRole()
    // console.log(role)

    const { user, logOut } = useAuthProvider();
    // console.log(user)
    const { primary } = useCustomTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { children } = props;
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // Settings for Profile
    const settings = [<button key={1} onClick={logOut}>Log Out</button>];

    const pages = <>
        <div className='lg:hidden'>
            {user &&
                <Grid container sx={{ alignItems: 'center', mx: '10px', my: 'auto', gap: '5px', display: { xs: 'block', md: 'none' }, flexWrap: 'wrap' }}>
                    <Tooltip title="Open settings" >
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: '2px solid #009EFF', ":hover": { filter: 'revert', opacity: '0.7' } }}>
                            {user ? user?.photoURL ? <img className='w-[40px] rounded-full' src={user?.photoURL}></img> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
                        </IconButton>
                    </Tooltip>
                    <Box >{user?.displayName}</Box>
                    <Menu
                        sx={{ mt: '50px' }}
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
                </Grid>
            }
        </div>
        <div className='link font-semibold text-lg'><NavLink to='/'><button className='p-2'>Home</button></NavLink></div>
        <div className='link font-semibold text-lg'><NavLink to='/allSurvey'><button className='p-2'>All Survey</button></NavLink></div>
        {role == 'admin' &&
            <div className='link font-semibold text-lg'><NavLink to='/dashboard'><button className='p-2'>Dashboard</button></NavLink></div>
        }
        <div className='link font-semibold text-lg'><NavLink to='/surveyDetails'><button className='p-2'>Details</button></NavLink></div>
        <div className='link font-semibold text-lg'><NavLink to='/pricing'><button className='p-2'>Pricing</button></NavLink></div>
        {user && <div className='link font-semibold text-lg'><button onClick={logOut} className='p-2'>Logout</button></div>}
    </>


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
                                {!user ? <>
                                    <Link to='/login' className='mr-4'>
                                        <PrimaryBtn variant='outlined' btn>
                                            Login
                                        </PrimaryBtn>
                                    </Link>
                                    <Link to='/signUp' className='mr-4'>
                                        <PrimaryBtn>
                                            SignUp
                                        </PrimaryBtn>
                                    </Link>
                                </> : ''
                                }

                                {user &&
                                    <Grid container spacing={2} columns={2} sx={{ alignItems: 'center', my: 'auto', gap: '5px', display: { xs: 'none', md: 'flex' }, }}>
                                        <Box >{user?.displayName}</Box>
                                        <Tooltip title="Open settings" >
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: '2px solid #009EFF', ":hover": { filter: 'revert', opacity: '0.7' } }}>
                                                {user ? user?.photoURL ? <img className='w-[40px] rounded-full' src={user?.photoURL}></img> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '50px' }}
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
                                    </Grid>
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Grid sx={{ mt: 0 }}>
                {children}
            </Grid>

        </React.Fragment>
    );
}
