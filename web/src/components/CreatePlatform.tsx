import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { navigate, RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { Link } from '@reach/router';
// -----------------------
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { usePlatformList } from './PlatformListProvider';
import { useProjectList } from './ProjectListProvider';
import { Box } from '@material-ui/core';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

var p = {
    height: '20px',
};

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

export default function CreatePlatform(_: RouteComponentProps) {

    const { subject } = useProjectList();
    const [projects, setProjects] = React.useState<Project[] | null>();

    const handleProjectList = (state: State<Project[] | null>) => {
        setIsPending(state.isPending);
        setProjects(state.value);
    };

    const [status, setstatus] = React.useState({
        isdeleted: false,
    })

    React.useEffect(() => {
        subject.attach(handleProjectList);
        subject.list();
        return () => subject.detach(handleProjectList);
    }, [subject]);

    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
    };

    let projectId: number | undefined;

    const match = useMatch('/dashboard/project/:projectId/platforms');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }

    const StyledLink = styled(Link)({ textDecoration: 'none' });

    // const fetch = React.useCallback(() => {
    //     if (projectId) {
    //         platformList.subject.list({
    //             filter: {
    //                 project: projectId,
    //             },
    //         });
    //     } else {
    //         platformList.subject.list(undefined);
    //     }
    // }, [projectId, platformList.subject]);

    // React.useEffect(() => {
    //     platformList.subject.attach(handlePlatformList);
    //     fetch();
    //     return () => platformList.subject.detach(handlePlatformList);
    // }, [fetch, platformList.subject]);

    const classes = useStyles();
    
    let data: number[] = [];
    let id: number = 0;
    //=========================
    let i = 0;
    {platforms?.map((platform) => (
        data.push(i+1)
    ))}

    const submit = (value : any) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
                onClick: () => axios.post('/api/v1/deleteproject/', {
                    projectId: value,
                })
                .then(function (response) {
                    console.log(response);
                    setstatus({
                        isdeleted : true,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                }),
            },
            {
              label: 'No',
              onClick: () => setstatus({
                isdeleted : false,
            })
            }
          ],
        });  
    };

    if(status.isdeleted === true){
        window.location.href='/dashboard/CreatePlatform/';
    }
    
    return ( 
        <>

            <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => navigate('/dashboard/newProject')}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{margin: 5}}
                        disabled={isPending}>
                        Add Project
                    </Button>
                </Box>
                    
            </Box>

            <Grid container spacing={2}>

                    <Grid item container spacing={1}>
                        <h3>Project List : </h3>
                    </Grid>

                    <Grid item container spacing={3}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell align="center" >S No.</StyledTableCell>
                                        <StyledTableCell align="center">Project Name</StyledTableCell>
                                        <StyledTableCell align="center">Project Description</StyledTableCell>
                                        <StyledTableCell align="center">Start Date</StyledTableCell>
                                        <StyledTableCell align="center">End Date</StyledTableCell>
                                        <StyledTableCell align="center" >Project </StyledTableCell>
                                        <StyledTableCell align="center" >Platform</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {projects?.map((project) => (

                                    <StyledTableRow key={project.id}>
                                    <StyledTableCell align="center" component="th" scope="row"> {id += 1 }</StyledTableCell>                                    
                                    <StyledTableCell align="center" component="th" scope="row">{project.name}</StyledTableCell>             
                                    <StyledTableCell align="center">{project.description}</StyledTableCell>
                                    <StyledTableCell align="center">{project.start_date.toString().split('T')[0]}</StyledTableCell>             
                                    <StyledTableCell align="center">{project.end_date.toString().split('T')[0]}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <StyledLink to={`/dashboard/UpdateProject/${project.id}`}>
                                                <Button size= "medium" color="primary">
                                                <EditRoundedIcon />
                                                </Button>
                                        </StyledLink> 
                                    
                                        <StyledLink to={`/dashboard/CreatePlatform/`}>
                                                <Button size= "medium" color="primary"        
                                                    onClick={() => submit(project.id)}>
                                                <DeleteIcon />
                                                </Button>
                                        </StyledLink>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <StyledLink to={`/dashboard/NewPlatform/${project.id}`}>
                                                <Button size= "medium" color="primary" >
                                                    Create<ChevronRightIcon />
                                                </Button>
                                        </StyledLink>
                                        <StyledLink to={`/dashboard/project/${project.id}/platforms`}>
                                                <Button size= "medium" color="primary" >
                                                    View <ChevronRightIcon />
                                                </Button>
                                        </StyledLink>
                                     </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>

                    </Grid>

                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>
            
            </Grid>
            
        </>
    );
}