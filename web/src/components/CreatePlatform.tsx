import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import ProjectCard, { SkeletonProjectCard } from './ProjectCard';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
import PlatformCard, { SkeletonPlatformCard } from './PlatformCard';
import Subject from '../modules/Subject';
import { navigate } from '@reach/router';
import { Tooltip, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NewuserIcon from './icons/Newuser';
import PlatformIcon from './icons/Platform';
import ProjectIcon from './icons/Project';
import { useProjectList } from './ProjectListProvider';
import { platform } from 'os';
import axios from "axios";
import { date } from 'yup';


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
  

  function createData(no: string, Platform_Name: string, Primary_Function: string, Platfom_Manned_Status: string, Platform_Risk_Ranking: string,
    Exposure_Category: string, Inspection_Intervals: string, Last_Inspection_Date: string, Next_Inspection_Date: string, Next_10_year: string ) {
    return { no, Platform_Name, Primary_Function, Platfom_Manned_Status, Platform_Risk_Ranking, Exposure_Category ,  Inspection_Intervals,
        Last_Inspection_Date, Next_Inspection_Date, Next_10_year };
  }
  
  const rows = [
    createData('1', 'PP', 'Production (P)', 'Yes', 'VH','L-1', '1', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('2', 'RP', 'Production (P)', 'NO', 'H', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('3', 'WP1', 'Drilling (D)', 'Yes', 'M', 'L-1', '6', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('4', 'WP10', 'Drilling (D)', 'Yes', 'M', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('5', 'QP', 'LQ (Q)', 'Yes', 'L', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


const StyledDivider = styled(Divider)(
    ({
        theme,
        bgcolor,
    }: {
        theme: Theme;
        bgcolor?: 'veryHigh' | 'high' | 'medium' | 'low' | 'veryLow';
    }) => ({
        backgroundColor: bgcolor
            ? theme.palette[bgcolor].main
            : theme.palette.divider,
        height: 4,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: theme.spacing(4),
        border: `1px solid ${
            bgcolor ? theme.palette[bgcolor].main : theme.palette.divider
        }`,
        borderRadius: theme.spacing(1),
    })
);

const StyledTypography = styled(Typography)({
    textTransform: 'uppercase',
    fontWeight: 800,
});

const SkeletonProjectCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((id) => (
            <Grid key={id} item xs={12}>
                <SkeletonProjectCard />
            </Grid>
        ))}
    </>
));

  const SkeletonPlatformCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SkeletonPlatformCard />
            </Grid>
        ))}
    </>
));

export default function CreatePlatform(_: RouteComponentProps) {
    // const { subject } = useProjectList();
    // const [isPending, setIsPending] = React.useState<boolean | undefined>();
    // const [projects, setProjects] = React.useState<Project[] | null>();

    // const handleProjectList = (state: State<Project[] | null>) => {
    //     setIsPending(state.isPending);
    //     setProjects(state.value);
    // };

    // React.useEffect(() => {
    //     subject.attach(handleProjectList);
    //     subject.list();
    //     return () => subject.detach(handleProjectList);
    // }, [subject]);

    const { subject } = useProjectList();
    // const [isPending, setIsPending] = React.useState<boolean | undefined>();
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

    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
    };

    let siteId: number | undefined;

    const match = useMatch('/dashboard/sites/:siteId/platforms');

    if (match) {
        siteId = parseInt((match as any).siteId);
    }

    const StyledLink = styled(Link)({ textDecoration: 'none' });

    const fetch = React.useCallback(() => {
        if (siteId) {
            platformList.subject.list({
                filter: {
                    site: siteId,
                },
            });
        } else {
            platformList.subject.list(undefined);
        }
    }, [siteId, platformList.subject]);

    React.useEffect(() => {
        platformList.subject.attach(handlePlatformList);
        fetch();
        return () => platformList.subject.detach(handlePlatformList);
    }, [fetch, platformList.subject]);

    const classes = useStyles();

    let backgroundColor: string[] = [];
    let Color: string[] = [];
    let data: number[] = [];
    let hoverBackgroundColor: string[] = [];
    let BackgroundColor: string[] = [];
    let pltname: string[] = [];
    let label: string[] = [];

    //=========================
    let i = 0;
    {platforms?.map((platform) => (
        data.push(i+1)
    ))}

    {platforms?.map((platform) => (
        pltname.push(platform.name)
        ))}
    // console.log(data)    


    //=========================
    {platforms?.map((platform) => (
        backgroundColor.push(platform.risk_ranking)
    ))}

    // 'veryHigh' | 'high' | 'medium' | 'low' | 'veryLow';
    //           '#B21F00',
    // '#FFA500',
    // '#2FDE00',
    // '#00A6B4',
    // '#6800B4'

    for(let i in backgroundColor){
        // console.log(backgroundColor[i])
        switch(backgroundColor[i]) { 
            case "VL": { 
               label.push('Very Low')
               console.log('VL')
               Color.push('#006400');
               hoverBackgroundColor.push('#006400');
            //    console.log("Excellent"); 
               break; 
            } 
            case "H": { 
                label.push('High')
                console.log('high')
                Color.push('#FF8C00');
                hoverBackgroundColor.push('#FF8C00');
                break; 
            } 
            case "M": {
                label.push('Medium')
                console.log('Medium')
                Color.push('#FFA500');
                hoverBackgroundColor.push('#FFA500');
                break;    
            } 
            case "L": { 
                label.push('Low')
                console.log('Low')
                Color.push('#ADFF2F');
                hoverBackgroundColor.push('#ADFF2F');
                break; 
            }  
            default: { 
                label.push('Very High')
                console.log('VH')
                Color.push('#FF0000');
                hoverBackgroundColor.push('#FF0000');
                break;              
            } 
        }
    }



    const state = {
        labels: pltname,
        datasets: [
          {
            label: 'Platform Risk',
            backgroundColor: Color,
            hoverBackgroundColor: BackgroundColor,
            data: data
          }
        ]
      }

    return ( 
        <>

            <Grid container spacing={2}>

                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>

                    <Grid item container spacing={1}>
                        <h3>Project List : </h3>
                    </Grid>

                    <Grid item container spacing={3}>
                        {/* {projects?.map((project) => (
                            <Grid key={project.id} item xs={12}>
                                <p>{project.name}</p>
                                {/* <ProjectCard project={project} /> */}
                            {/* </Grid> */}
                        {/* ))} */}
                        {/* {isPending && <SkeletonProjectCards />}  */}

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        {/* <StyledTableCell style={{minWidth: 30}} >Project No.</StyledTableCell> */}
                                        <StyledTableCell style={{minWidth: 30}} align="center">Project Name</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 30}} align="center">Project Description</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 30}} align="center">Start Date</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 30}} align="center">End Date</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 30}} align="center" ></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {projects?.map((project) => (

                                    <StyledTableRow key={project.id}>
                                    {/* <StyledTableCell style={{minWidth: 30}} component="th" scope="row"> {project.id}</StyledTableCell> */}
                                    <StyledTableCell style={{minWidth: 30}} align="center" component="th" scope="row">{project.name}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.description}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.start_date.toString().split('T')[0]}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.end_date.toString().split('T')[0]}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 30}} align="right">
                                    <StyledLink to={`/dashboard/NewPlatform/`}>
                                            <Button color="primary">
                                                Create Platform <ChevronRightIcon />
                                            </Button>
                                    </StyledLink>
                                     {/* <ListItem alignItems="center"
                                            button
                                            onClick={() => navigate('/dashboard/NewPlatform')}>
                                            <Tooltip title="NewProject">
                                                <ListItemIcon>
                                                    <PlatformIcon />
                                                </ListItemIcon>
                                            </Tooltip>
                                            <ListItemText primary="Create Platform" />
                                        </ListItem>  */}
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