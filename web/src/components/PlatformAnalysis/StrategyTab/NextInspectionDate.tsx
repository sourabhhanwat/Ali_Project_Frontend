import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import {Link, styled} from '@material-ui/core';

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(60),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    objectFit: 'contain',
    textAlign: 'center',
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const graphStyles = makeStyles({
    table: {
        border: '1.6px solid white',
        fontSize: 26,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },

    table_head: {
        width: '29rem',
        borderCollapse : 'collapse',
        margin: '0 auto',
    },

    x_design:{
        transform: 'rotate(-90deg)',
        color: 'black',
        width: '1%',
        fontSize: '15px',
        letterSpacing: '1.5px',
    },

    y_design:{
        textAlign: 'end',
        color: 'black',
        fontSize: '15px',
        letterSpacing: '1.5px',
        paddingRight: '1.8rem', 
    },

    x_axis :{
        borderTop : '2px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
        height: 60,
        width: '10%'
    },

    y_axis : {
        borderRight : '2px solid black',
        height: 60,
        width: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    red: {
        backgroundColor: '#FF0000',
    },

    darkGreen:{
        backgroundColor: '#539204',
    },

    lightGreen: {
        backgroundColor: '#92D050',
    },

    orange: {
        backgroundColor: '#FFC000',
    },

    yellow: {
        backgroundColor: '#FFFF00'
    },

});

  
export default function NextInspectionDate() {


    const platformTypeListSubject = usePlatformTypeListContext();

    const graph = graphStyles();

    const { watch } = useFormContext();
    const risk_ranking = watch(
        'risk_ranking'
    );

    console.log("I AM RISK ==>" ,risk_ranking);

    let red = (risk_ranking === 'H') ?  'orange' : (risk_ranking === 'VH') ?  'red' : (risk_ranking === 'M') ?  'yellow' : (risk_ranking === 'L') ?  'yellowgreen' : 'green';
    let risk = (risk_ranking === 'H') ?  'High (H)' : (risk_ranking === 'VH') ?  'Very High (VH)' : (risk_ranking === 'M') ?  'Medium (M)' : (risk_ranking === 'L') ?  'Low (L)' : 'Very Low (VL)';

   
    const final_consequence_category = watch(
        'final_consequence_category'
    );

    const lof_ranking = watch('lof_ranking');
 
    const risk_based_underwater_inspection_interval = watch('risk_based_underwater_inspection_interval');
    console.log("Ranking i am==>", lof_ranking, risk_based_underwater_inspection_interval);
    
    let graphMarking :any;
    graphMarking= lof_ranking + final_consequence_category;
    
    console.log("GRAPH RANKING ==>" ,graphMarking)

    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>

                        <Typography style={{marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem'}}>Inspection Interval Based on Risk Level</Typography>
                    
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid item xs={2}>
                                    <p>
                                    Platform Risk Level
                                    </p>

                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{backgroundColor: red, height:"50px"}}>
                                        <Typography style={{color: "Black",paddingTop:"13px" ,paddingLeft:"30%"}}>{risk}</Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                    Risk Based Underwater Inspection Interval (Years)
                                    </p>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Risk Based Underwater Inspection Interval (Years)"
                                        name={[
                                            'risk_based_underwater_inspection_interval',
                                        ]}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Grid>   
                        <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <div style={{marginTop: '3rem'}}>
                                    <table className={graph.table_head}>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={5} className={graph.table+ " " +graph.x_design}>LIKELIHOOD OF FAILURE</td>
                                            <td className={graph.y_axis} id="">5</td>
                                            <td className={graph.table+ " " +graph.yellow} style={{borderTop: '2px solid black'}}>{graphMarking === '5A' ? 'M' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5B' ? 'H' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5C' ? 'H' : ''}</td>
                                            <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black'}}>{graphMarking === '5D' ? 'VH' : ''}</td>
                                            <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black', borderRight: '2px solid black'}}>{graphMarking === '5E' ? 'VH' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td className={graph.y_axis}>4</td>
                                            <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '4A' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.yellow}>{graphMarking === '4B' ? 'M' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange}>{graphMarking === '4C' ? 'H' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange}>{graphMarking === '4D' ? 'H' : ''}</td>
                                            <td className={graph.table+ " " +graph.red} style={{borderRight: '2px solid black'}}>{graphMarking === '4E' ? 'VH' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td className={graph.y_axis}>3</td>
                                            <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3A' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3B' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.yellow}>{graphMarking === '3C' ? 'M' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange}>{graphMarking === '3D' ? 'H' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '3E' ? 'H' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td className={graph.y_axis}>2</td>
                                            <td className={graph.table+ " " +graph.darkGreen}>{graphMarking === '2A' ? 'VL' : ''}</td>
                                            <td className={graph.table+ " " +graph.lightGreen}>{lof_ranking + final_consequence_category}</td>
                                            <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '2C' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.yellow}>{graphMarking === '2D' ? 'M' : ''}</td>
                                            <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '2E' ? 'H' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td className={graph.y_axis}>1</td>
                                            <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1A' ? 'VL' : ''}</td>
                                            <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1B' ? 'VL' : ''}</td>
                                            <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1C' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1D' ? 'L' : ''}</td>
                                            <td className={graph.table+ " " +graph.yellow} style={{borderRight: '2px solid black', borderBottom: '2px solid black'}}>{graphMarking === '1E' ? 'M' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td className={graph.table}></td>
                                            <td className={graph.x_axis} id="">A</td>
                                            <td className={graph.x_axis} id="">B</td>
                                            <td className={graph.x_axis} id="">C</td>
                                            <td className={graph.x_axis} id="">D</td>
                                            <td className={graph.x_axis} id="">E</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={7} className={graph.table+ " " +graph.y_design}>CONSEQUENCE OF FAILURE</td>
                                        </tr>
                                        </tbody>
                                        </table>

                                    </div>
                                </Grid>
                        </Grid>
                        

{/* ============================================== */}
            <Accordion> 
                <AccordionSummary>
                        <Typography>Inspection Interval based on Exposure Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <p>Exposure Category Level</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level']}
                                label="Level"
                                disabled
                                nullable
                            />
                            {/* <Typography variant="subtitle2">
                            {'exposure_category_level'}                                
                            </Typography> */}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <p>Type of Survey Level</p> 
                        </Grid> 
                        
                        <Grid item xs={12} md={6}>
                            <p>Inspection Interval (Years)</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <p>Level I</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level_1']}
                                label="Level I"
                                disabled
                            />
                        </Grid>         
                    
                        <Grid item xs={12} md={6}>
                            <p>Level II</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level_2']}
                                label="Level II"
                                disabled
                            />
                            {/* <Typography variant="subtitle2">
                            {'exposure_category_level_2'}                                
                            </Typography> */}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <p>Level III</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level_3']}
                                label="Level III"
                                disabled
                            />
                            {/* <Typography variant="subtitle2">
                            {exposure_category_level_3}                                
                            </Typography> */}
                        </Grid>
                    </Grid> 
                
                </AccordionDetails>
            </Accordion>
{/* ================================================================= */}

            <Accordion> 
                <AccordionSummary>
                        <Typography>Selected Next Inspection Interval and Inspection Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                        <p>Type of Survey Level</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <p>Next Selected Inspection Interval (Years)</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <p>Next Inspection Date</p> 
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <p>Level I</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['level_1_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <TextField
                            label="Inspection Date"
                            name={['level_1_next_inspection_date']}
                            // disabled
                            // required
                        />
                    </Grid>        
                
                    <Grid item xs={6} md={3}>
                        <p>Level II</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['level_2_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                     <TextField
                        label="Inspection Date"
                        name={['level_2_next_inspection_date']}
                        // disabled
                        // required
                    /> 
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <p>Level III</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['level_3_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                    <TextField
                        label="Inspection Date"
                        name={['level_3_next_inspection_date']}
                        // disabled
                        // required
                    />
                    </Grid>

            </Grid>
            </AccordionDetails>
            </Accordion>
        </Grid>
        ),
        [platformTypeListSubject]
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary style={{backgroundColor: "#02bfa6" }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">Next Inspection Date</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
