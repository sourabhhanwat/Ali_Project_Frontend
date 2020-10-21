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
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from '@reach/router';
import React from 'react';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import RelativeDate from './RelativeDate';
import axios from "axios";

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
    
    const deletePlatform = (value : any) => {

        console.log(value);

        axios.post('/api/v1/deleteplatform/', {
            platformId: value,
          })
    
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });
      
    };

    return (
        <Card>
            <CardContent>
                {/* <Box style={{paddingLeft: "45%"}}> */}
                {/* </Box> */}
                <Box fontWeight={800} clone>
                    <Typography variant="h5">Platform {platform.name}</Typography>
                </Box>
                <Typography variant="caption">
                    <RelativeDate date={platform.updated_at} />
                </Typography>
            </CardContent>
            <Divider />
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
                
            </List>
            <Box justifyContent="space-between" clone>
                <CardActions>
                <StyledLink to={`/dashboard/UpdatePlatform/${platform.id}`}>
                        <Button size= "small" title="Update" color="primary">
                        <UpdateIcon />
                        </Button>
                </StyledLink> 
                <StyledLink to={`/dashboard/platforms/`}>
                        <Button size= "small" title="Delete" color="primary"
                        onClick={() => deletePlatform(platform.id)} >
                            <DeleteIcon />
                        </Button>
                </StyledLink>
                    <StyledLink
                        to={`/dashboard/platforms/${platform.id}/analysis`}
                    >
                        <Box  clone fontWeight={800}>
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