import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Match } from '@reach/router';
import React from 'react';

export default function CommonBreadcrumbs() {
    return (
        <>
            <Match path="/dashboard/newprojects">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>Projects</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>

            <Match path="/dashboard/projects">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>Projects</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
            <Match path="/dashboard/rbui">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>RBUI Dashboard</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
            <Match path="/dashboard/CreatePlatform">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>Projects</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
            <Match path="/dashboard/platforms">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>Platforms</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
            <Match path="/dashboard/sites/:platformId/platforms">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>{(props.match as any).platformId}</Box>
                            <Box>Platforms</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
            <Match path="/dashboard/platforms/:platformId/analysis">
                {(props) =>
                    props.match && (
                        <Breadcrumbs separator=">">
                            <Box>Platforms</Box>
                            <Box>{(props.match as any).platformId}</Box>
                            <Box>Analysis</Box>
                        </Breadcrumbs>
                    )
                }
            </Match>
        </>
    );
}
