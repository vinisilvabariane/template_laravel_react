import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Tab, Tabs } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Home', 'Projects'];

function tabsProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Navbar() {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentTab = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 0;
        if (path === '/projects') return 1;
        return 0;
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page?: string) => {
        setAnchorElNav(null);
        if (page) {
            const path = page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`;
            navigate(path);
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/projects');
                break;
        }
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                backgroundImage: 'none'
            }}
        >
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    {/* Logo para mobile */}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            cursor: 'default',
                            userSelect: 'none'
                        }}
                    >
                        &lt;/&gt;
                    </Typography>
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'flex-end',
                        flexGrow: 1
                    }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu()}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    backgroundColor: '#141416',
                                }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{ color: 'white' }}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo para desktop */}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: 1,
                            cursor: 'default',
                            userSelect: 'none'
                        }}
                    >
                        &lt;/&gt;
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tabs
                            value={getCurrentTab()}
                            onChange={handleTabChange}
                            textColor="inherit"
                            indicatorColor="secondary"
                            sx={{
                                '& .MuiTab-root': {
                                    color: 'white',
                                    '&.Mui-selected': {
                                        color: 'white',
                                    },
                                    minWidth: 100,
                                    fontSize: '1rem'
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'white',
                                }
                            }}
                        >
                            <Tab label="Home" {...tabsProps(0)} />
                            <Tab label="Projects" {...tabsProps(1)} />
                        </Tabs>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}