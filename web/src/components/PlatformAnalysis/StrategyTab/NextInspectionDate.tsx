import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import DatePicker from '../../FormWidget/DatePicker';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';


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

  
export default function NextInspectionDate() {


    const platformTypeListSubject = usePlatformTypeListContext();
    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>
                {/* first */}
                <Accordion>
                    <AccordionSummary>
                        <Typography>Inspection Interval Based on Risk Level</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Platform Risk Level
                                </p>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Platform Risk Level"
                                    name={[
                                        'risk_ranking',
                                    ]}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Risk Based Underwater Inspection Interval (Years)
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Risk Based Underwater Inspection Interval (Years)"
                                    name={[
                                        'risk_based_underwater_inspection_interval',
                                    ]}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                        <Grid container spacing = {1}>
                            <Grid item xs={12}>
                                <div>
                                <TableContainer component={Paper}>
                                 <Table>
                                    <TableBody style={{borderColor: "black"}}>
                                        {/* {rowscol.map((row) => ( */}
                                            <StyledTableRow>
                                            <StyledTableCell rowSpan={7} style={{backgroundColor: "white"}} component="th" scope="row" align="center">LIKELIHOOD OF FAILURE</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">5</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center"></StyledTableCell>
                                            <StyledTableCell  style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">4</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">3</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">2</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">1</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center">A</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center">B</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center">C</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center">D</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">E</StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell  style={{backgroundColor: "white"}} component="th" scope="row" align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell colSpan={6} style={{backgroundColor: "white"}} align="center">CONSEQUENCE OF FAILURE</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center"></StyledTableCell></StyledTableRow>

                                        {/* ))} */}
                                        </TableBody>
                                 </Table>
                            </TableContainer>    
                            </div>
                            </Grid>
                        </Grid> 
                    </AccordionDetails>
                </Accordion> 
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
                        <DatePicker
                            label="Inspection Date"
                            name={['level_1_next_inspection_date']}
                            disabled
                            required
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
                     <DatePicker
                        label="Inspection Date"
                        name={['level_2_next_inspection_date']}
                        disabled
                        required
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
                    <DatePicker
                        label="Inspection Date"
                        name={['level_3_next_inspection_date']}
                        disabled
                        required
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Next Inspection Date</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
