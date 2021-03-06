import MAppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { styled, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Match } from '@reach/router';
import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Drawer from './Drawer';
import PlatformIcon from './icons/Platform';
import ProjectIcon from './icons/Project';
import SiteIcon from './icons/Site';

const StyledAppBar = styled(MAppBar)(
    ({ theme, open }: { theme: Theme; open?: boolean }) => {
        return {
            zIndex: theme.zIndex.drawer + 1,
            ...{
                open: {
                    width: `calc(100% - ${theme.shape.drawerWidth}px)`,
                    marginLeft: theme.shape.drawerWidth,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
                close: {
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                },
            }[open ? 'open' : 'close'],
        };
    }
);

function ResourceAvatar() {
    return (
        <Box clone display="block" mr={4} ml={1}>
            <Avatar>
                <Match path="/dashboard/rbi">
                    {(props) => props.match && <ProjectIcon />}
                </Match>
                <Match path="/dashboard/newProject">
                    {(props) => props.match && <ProjectIcon />}
                </Match>
                <Match path="/dashboard/UpdateProject/:projectId">
                    {(props) => props.match && <ProjectIcon />}
                </Match>
                <Match path="/dashboard/NewPlatform/:platformId">
                    {(props) => props.match && <PlatformIcon />}
                </Match>
                <Match path="/dashboard/CreatePlatform">
                    {(props) => props.match && <SiteIcon />}
                </Match>
                <Match path="/dashboard/project/:projectId/platforms">
                    {(props) => props.match && <PlatformIcon />}
                </Match>
                <Match path="/dashboard/platforms/:platformId/analysis">
                    {(props) => props.match && <PlatformIcon />}
                </Match>
            </Avatar>
        </Box>
    );
}

function ResourceTitle() {
    return (
        <Box clone fontWeight={800}>
            <Typography variant="h4">
                <Match path="/dashboard/projects">
                    {(props) => props.match && 'Project List'}
                </Match>
                <Match path="/dashboard/newProject">
                    {(props) => props.match && 'New Project'}
                </Match>
                <Match path="/dashboard/UpdateProject/:projectId">
                    {(props) => props.match && 'Update Project'}
                </Match>
                <Match path="/dashboard/NewPlatform/:platformId">
                    {(props) => props.match && 'New Platform'}
                </Match>
                <Match path="/dashboard/rbi">
                    {(props) => props.match && 'RBI Dashboard'}
                </Match>
                <Match path="/dashboard/CreatePlatform">
                    {(props) => props.match && 'Project List'}
                </Match>
                <Match path="/dashboard/project/:projectId/platforms">
                    {(props) => props.match && 'Platform List'}
                </Match>
                <Match path="/dashboard/platforms/:platformId/analysis">
                    {(props) => props.match && 'Platform Analysis'}
                </Match>
            </Typography>
        </Box>
    );
}

function ResourceCaption() {
    return (
        <Box>
            <Typography variant="body1">
                <Match path="/dashboard/projects">
                    {(props) =>
                        props.match && 'List all projects that you can view.'
                    }
                </Match>
                <Match path="/dashboard/newProject">
                    {(props) =>
                        props.match && 'Users can create new project.'
                    }
                </Match>
                <Match path="/dashboard/UpdateProject/:projectId">
                    {(props) =>
                        props.match && 'Users can update Existing project.'
                    }
                </Match>
                <Match path="/dashboard/NewPlatform/:platformId">
                    {(props) =>
                        props.match && 'Users can create new platform.'
                    }
                </Match>
                <Match path="/dashboard/rbi">
                    {(props) =>
                        props.match && 'RBI Summary Dashboard'
                    }
                </Match>
                <Match path="/dashboard/CreatePlatform">
                    {(props) =>
                        props.match && 'List all projects that you can view.'
                    }
                </Match>
                <Match path="/dashboard/projects/:projectId/sites">
                    {(props) =>
                        props.match &&
                        'List all sites that you can view for current project.'
                    }
                </Match>
                <Match path="/dashboard/project/:projectId/platforms">
                    {(props) =>
                        props.match && 'List all platforms that you can view for current project.'
                    }
                </Match>
                <Match path="/dashboard/platforms/:platformId/analysis">
                    {(props) => props.match && 'Run analysis on the platform.'}
                </Match>
            </Typography>
        </Box>
    );
}

export default function Layout({ children }: any) {
    const [open, setOpen] = React.useState(false);

    return (
        <Box display="flex">
            <StyledAppBar color="secondary" position="fixed" open={open}>
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => {
                            setOpen((value) => !value);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        RBI - Offshore Jacket Structures
                    </Typography>
                </Toolbar>
            </StyledAppBar>
            <Drawer open={open} />
            <Box clone bgcolor="grey.100" minHeight="100vh">
                <Grid container alignContent="flex-start">
                    <Grid item xs={12}>
                        <Toolbar />
                        <Container maxWidth="xl">
                            <Breadcrumbs />
                            <Box
                                display="flex"
                                alignItems="center"
                                pt={1}
                                pb={4}
                            >
                                <ResourceAvatar />
                                <Box>
                                    <ResourceTitle />
                                    <ResourceCaption />
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container maxWidth="xl">{children}</Container>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
