import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import ProjectCard, { SkeletonProjectCard } from './ProjectCard';
import {Pie} from 'react-chartjs-2';
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

export default function ProjectList(_: RouteComponentProps) {
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

    for(let i in backgroundColor){
        console.log(backgroundColor[i])
        switch(backgroundColor[i]) { 
            case "VL": { 
               label.push('Very Low')
               Color.push('#6800B4');
               hoverBackgroundColor.push('#6800B4');
            //    console.log("Excellent"); 
               break; 
            } 
            case "H": { 
                label.push('High')
                Color.push('#FFA500');
                hoverBackgroundColor.push('#FFA500');
                break; 
            } 
            case "M": {
                label.push('Medium')
                Color.push('#2FDE00');
                hoverBackgroundColor.push('#FFA500');
                break;    
            } 
            case "L": { 
                label.push('Low')
                Color.push('#00A6B4');
                hoverBackgroundColor.push('#FFA500');
                break; 
            }  
            default: { 
                label.push('Very High')
                Color.push('#B21F00');
                hoverBackgroundColor.push('#FFA500');
                break;              
            } 
        }
    }


    //           '#B21F00',
    // '#FFA500',
    // '#2FDE00',
    // '#00A6B4',
    // '#6800B4'

    // '#501800',
    // '#4B5000',
    // '#175000',
    // '#003350',
    // '#35014F'

    // for(let i in BackgroundColor){
    //     console.log(BackgroundColor[i])
    //     switch(BackgroundColor[i]) { 
    //         case "VL": { 
    //            Color.push('#6800B4');
    //         //    console.log("Excellent"); 
    //            break; 
    //         } 
    //         case "H": { 
    //            Color.push('#FFA500');
    //            break; 
    //         } 
    //         case "M": {
    //             Color.push('#2FDE00');
    //             break;    
    //         } 
    //         case "L": { 
    //             Color.push('#00A6B4');
    //             break; 
    //         }  
    //         default: { 
    //             Color.push('#501800');
    //             break;              
    //         } 
    //     }
    // }


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
             {/* <Box display="flex" justifyContent="flex-end" my={2}>
                    <Box fontWeight={800} clone>
                        <ListItem
                        button
                        onClick={() => navigate('/dashboard/newProject')}>
                        <Tooltip title="NewProject">
                            <ListItemIcon>
                                <ProjectIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="New Project" />
                    </ListItem>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                     <ListItem
                    button
                    onClick={() => navigate('/dashboard/NewPlatform')}>
                    <Tooltip title="NewProject">
                        <ListItemIcon>
                            <PlatformIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="New Platform" />
                </ListItem>
                </Box>
            </Box>  */}
            <Grid container spacing={2}>

                <Grid item container spacing={1}>
                    <p style={p}></p>
                </Grid>


                <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <ListItem
                            button
                            onClick={() => navigate('/dashboard/newProject')}>
                            <Tooltip title="NewProject">
                                <ListItemIcon>
                                    <ProjectIcon />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Add New Project" />
                        </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                        <ListItem
                            button
                            onClick={() => navigate('/dashboard/NewPlatform')}>
                            <Tooltip title="NewProject">
                                <ListItemIcon>
                                    <PlatformIcon />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Add New Platform" />
                         </ListItem>
                        </Grid>
                    </Grid>


                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>


                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                                <Pie
                                    data={state}
                                    width={500}
                                    height={140}
                                    options={{
                                        title:{
                                            display:true,
                                            text:'OFFSHORE FIELD-1 RISK LEVELS',
                                            fontSize:20
                                            },
                                        legend:{
                                        display:true,
                                        position:'bottom'
                                        }
                                    }}
                                />
                        </Grid>  
                    </Grid>

                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>

                    <Grid item container spacing={1}>
                        <h3>Platform List : </h3>
                    </Grid>


                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        {/* <StyledTableCell style={{minWidth: 120}} >No.</StyledTableCell> */}
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Name</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 120}} align="center">Primary Function</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platfom Manned Status</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Risk Ranking</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Exposure Category</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Selected Next Inspection Intervals (years)</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Last Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Next Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={10} style={{minWidth: 120}} align="center">Recommended Inspection Plan for Next 10 years</StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        {/* <StyledTableCell style={{minWidth: 120}} ></StyledTableCell> */}
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2020</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2021</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2022</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2023</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2024</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2025</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2026</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2027</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2028</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2029</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {platforms?.map((platform) => (

                                    <StyledTableRow key={platform.id}>
                                    {/* <StyledTableCell style={{minWidth: 120}} component="th" scope="row"> {platform.id}</StyledTableCell> */}
                                    <StyledTableCell style={{minWidth: 120}} align="center" component="th" scope="row">{platform.name}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.environmental_consequence.platform_type.name}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.platform_manned_status.name}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.risk_ranking}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.exposure_category_level}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_next_inspection_date}</StyledTableCell>
                                    
                                    {platform.next_10_years_inspection_plan?.map((next) => (
                                        <StyledTableCell style={{minWidth: 130}} align="center">{next.level}</StyledTableCell>
                                    ))},
                                    {/* <StyledTableCell style={{minWidth: 130}} align="center">Level 3</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1 Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1 Level 2 Level 3</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2 Level 3</StyledTableCell> */}
                                    
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Grid>  
                    </Grid>


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