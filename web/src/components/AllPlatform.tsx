import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import PlatformIcon from './icons/Platform';
import { usePlatformList } from './PlatformListProvider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useProjectList } from './ProjectListProvider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import RelativeDate from './RelativeDate';
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined';
import Filter2OutlinedIcon from '@material-ui/icons/Filter2Outlined';
import Filter3OutlinedIcon from '@material-ui/icons/Filter3Outlined';
import Filter4OutlinedIcon from '@material-ui/icons/Filter4Outlined';
import Filter5OutlinedIcon from '@material-ui/icons/Filter5Outlined';
import Skeleton from '@material-ui/lab/Skeleton';

const StyledLink = styled(Link)({ textDecoration: 'none' });

const StyledAvatar1 = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

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


export default function AllPlatform(this: any, _: RouteComponentProps) {

    const { subject } = useProjectList();
    const [isPending, setIsPending] = React.useState<boolean | undefined>();
    const [projects, setProjects] = React.useState<Project[] | null>();

    const handleProjectList = (state: State<Project[] | null>) => {
        setIsPending(state.isPending);
        setProjects(state.value);
    };

    React.useEffect(() => {
        subject.attach(handleProjectList);
        subject.list();
        return () => subject.detach(handleProjectList);
    }, [subject]);   
     
  return (
       <Box>
           <Box display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <Box display="flex" justifyContent="center" mb={2}>
                <StyledAvatar1>
                     <PlatformIcon />
                </StyledAvatar1>
              </Box>
              <Box display="flex" justifyContent="center" mb={2}>
                 <Typography variant="h5">Platform List</Typography>
              </Box>
            </Box> 
           <Grid item container spacing={1}>
            {projects?.map((project) => (
                    <Grid item xs={4}>
                        <Card>
                        <CardContent>
                            <Box fontWeight={800} clone>
                                <Typography variant="h5">Platform {project.name}</Typography>
                            </Box>
                            <Typography variant="caption">
                                <RelativeDate date={project.updated_at} />
                            </Typography>
                        </CardContent>
                        <Box justifyContent="flex-end" clone>
                            <CardActions>
                                <StyledLink
                                    to={`/dashboard/platforms/${project.id}/analysis`}
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
                    </Grid>
                ))}
            </Grid>
            <Grid style={{height: "40px"}} item xs={12}>
            </Grid>
        </Box>
    );
}