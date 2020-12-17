import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import {Pie} from 'react-chartjs-2';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { usePlatformList } from './PlatformListProvider';
import { MenuItem, TextField } from '@material-ui/core';
import { useProjectList } from './ProjectListProvider';
import { useForm } from "react-hook-form";
import { Link } from '@reach/router';
import axios from "axios";

  
interface IFormInput {
    firstName: string;
}

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


const StyledLink = styled(Link)({ textDecoration: 'underline', padding : 'unset' });

export default function ProjectList(_: RouteComponentProps) {

    const { register } = useForm<IFormInput>();
    const { subject } = useProjectList();
    const [search, setSearchId] = React.useState('');
    const [lst, setLst] = React.useState([])

      React.useEffect(() => {
        axios.get('/api/v1/projects/')
          .then(data => {
            setLst(data.data.map((item : any) => ({
                    username : item.name,
                    id : item.id,
                  })))
          });
      }, []);

    let searchresult : any

    const platformList = usePlatformList();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();
    const [copied, copyPlatforms] = React.useState<Platform[] | null>();
    const [duplicate, duplicatePlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setPlatforms(state.value);
        copyPlatforms(state.value);
        duplicatePlatforms(state.value);
    };

    let projectId: number | undefined;

    const match = useMatch('/dashboard/project/:projectId/platforms');

    if (match) {
        projectId = parseInt((match as any).siteId);
    }

    const fetch = React.useCallback(() => {
        if (projectId) {
            platformList.subject.list({
                filter: {
                    project: projectId,
                },
            });
        } else {
            platformList.subject.list(undefined);
        }
    }, [projectId, platformList.subject]);

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
    let id: number = 0;

    //=========================
    let i = 0;
    {platforms?.map((platform) => (
        data.push(i+1)
    ))}

    {platforms?.map((platform) => (
        pltname.push(platform.name)
    ))}

    //=========================
    var arr: (string | null)[]= []
    {platforms?.map((platform) => (
        arr.push(platform.risk_ranking)
        // var val = arr.push(8)
    ))}

    for(let i in arr){

        switch(arr[i]) { 
            case "VL": { 
               label.push('Very Low')
               console.log('VL')
               Color.push('#00B050');
               hoverBackgroundColor.push('#00B050');    
               break; 
            } 
            case "H": { 
                label.push('High')
                console.log('high')
                Color.push('#FFC000');
                hoverBackgroundColor.push('#FFC000');
                break; 
            } 
            case "M": {
                label.push('Medium')
                console.log('Medium')
                Color.push('#FFFF00');
                hoverBackgroundColor.push('#FFFF00');
                break;    
            } 
            case "L": { 
                label.push('Low')
                console.log('Low')
                Color.push('#92D050');
                hoverBackgroundColor.push('#92D050');
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchId(event.target.value);
        duplicatePlatforms(copied);
        let values = copied?.filter((v : any) => v.project === event.target.value)
        console.log('project 1 value = ', values)
        setPlatforms(values);
        console.log("copied ==", copied)
        console.log("duplicate ==", duplicate)
        console.log("original ==",platforms)
    };

    
    return ( 
        <div>
            <Grid container spacing={2}>
                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                                <Pie
                                    data={state}
                                    width={500}
                                    height={140}
                                    options={{
                                        title:{
                                            display:true,
                                            text:'',
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
                         <h3 style={{paddingLeft: "8px"}}>Project List : </h3>
                    </Grid>
                    
                    {/* /// search Box Added  */}

                    <Grid item container spacing={1}>
                        <Grid item xs={8}>

                        <TextField
                            select
                            label="Select Project"
                            value={search}
                            onChange={handleChange}
                            variant="outlined"
                            style={{width : '30%' , backgroundColor: 'white'}}
                            name="res" 
                            ref={register}>
                                {lst.map((list: any) => (
                                <MenuItem key={list.id} value={list.id}>
                                    {list.username}
                                </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                       
                    </Grid>
                    {/* SearchBox Ended */}

                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell style={{minWidth: 120}} align="center" >S No.</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Name</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Primary Function</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Manned Status</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Risk Ranking</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Exposure Category</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Selected Next Inspection Intervals (years)</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Last Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Next Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={10} style={{minWidth: 120}} align="center">Recommended Inspection Plan for Next 10 years</StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
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
                                    <StyledTableCell align="center" component="th" scope="row"> {id += 1}</StyledTableCell>
                                    
                                    <StyledTableCell align="center" component="th" scope="row">
                                    <StyledLink to={`/dashboard/platforms/${platform.id}/analysis`}>
                                        {platform.name}
                                        </StyledLink> 
                                        </StyledTableCell> 
                                           
                                    <StyledTableCell align="center">{platform.environmental_consequence.platform_type === null || platform.environmental_consequence.platform_type.name == 'Any' ? '-' : platform.environmental_consequence.platform_type.name  }</StyledTableCell>
                                    <StyledTableCell align="center">{platform.manned === false ? '-' : 'Yes'}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.risk_ranking === null ? '-' : platform.risk_ranking}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.exposure_category_level === null ? '-' : platform.exposure_category_level}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_1_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_2_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_3_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_1_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_2_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_3_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_1_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_2_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell align="center">{platform.level_3_next_inspection_date}</StyledTableCell>
                                    
                                    {platform.next_10_years_inspection_plan?.map((next) => (
                                        <StyledTableCell style={{minWidth: 130}} align="center">{next.level}</StyledTableCell>
                                    ))},
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
            </Grid>   
        </div>         
            
    );
}