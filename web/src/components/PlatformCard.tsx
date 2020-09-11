import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { styled, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined';
import Filter2OutlinedIcon from '@material-ui/icons/Filter2Outlined';
import Filter3OutlinedIcon from '@material-ui/icons/Filter3Outlined';
import Filter4OutlinedIcon from '@material-ui/icons/Filter4Outlined';
import Filter5OutlinedIcon from '@material-ui/icons/Filter5Outlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from '@reach/router';
import React from 'react';
import RelativeDate from './RelativeDate';

const StyledAvatar = styled(Avatar)(
    ({
        theme,
        level,
    }: {
        theme: Theme;
        level: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh';
    }) => ({
        '&.MuiAvatar-colorDefault': {
            color: theme.palette[level].main,
            backgroundColor: theme.palette[level].light,
        },
    })
);

export function SkeletonPlatformCard() {
    return (
        <Card>
            <CardContent>
                <Box fontWeight={800} clone>
                    <Typography variant="h5">
                        <Skeleton variant="text" />
                    </Typography>
                </Box>
                <Typography variant="caption">
                    <Skeleton variant="text" />
                </Typography>
            </CardContent>
            <Divider />
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                clone
            >
                <CardContent>
                    <Box clone fontWeight={800}>
                        <Typography>
                            <Skeleton variant="text" />
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="caption">
                            <Skeleton variant="text" />
                        </Typography>
                    </Box>
                </CardContent>
            </Box>
            <Divider />
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryHigh">
                            <Filter1OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="high">
                            <Filter2OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="medium">
                            <Filter3OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="low">
                            <Filter4OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryLow">
                            <Filter5OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    );
}

const StyledLink = styled(Link)({ textDecoration: 'none' });

export default function PlatformCard({ platform }: { platform: Platform }) {
    return (
        <Card>
            <CardContent>
                <Box fontWeight={800} clone>
                    <Typography variant="h5">Platform {platform.name}</Typography>
                </Box>
                <Typography variant="caption">
                    <RelativeDate date={platform.updated_at} />
                </Typography>
            </CardContent>
            <Divider />
            {/* <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                clone
            >
                <Tooltip title={platform.description}>
                    <CardContent>
                        <Box clone fontWeight={800}>
                            <Typography>Site</Typography>
                        </Box>
                        <Box>
                            <Typography>{platform.name}</Typography>
                            <Typography variant="caption">
                                <RelativeDate date={platform.updated_at} />
                            </Typography>
                        </Box>
                    </CardContent>
                </Tooltip>
            </Box> */}
            <Divider />
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryHigh">
                            <Filter1OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>Structures</Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="high">
                            <Filter2OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>Pipelines</Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="medium">
                            <Filter3OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>Wells</Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="low">
                            <Filter4OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>Critical Safety System</Typography>
                            </Box>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryLow">
                            <Filter5OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>QHSE</Typography>
                            </Box>
                        }
                    />
                </ListItem>
            </List>
            <Box justifyContent="flex-end" clone>
                <CardActions>
                    <StyledLink
                        to={`/dashboard/platforms/${platform.id}/analysis`}
                    >
                        <Box clone fontWeight={800}>
                            <Button color="primary">
                                View <ChevronRightIcon />
                            </Button>
                        </Box>
                    </StyledLink>
                </CardActions>
            </Box>
        </Card>
    );
}
