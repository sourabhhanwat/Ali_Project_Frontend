import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import {Link, styled, Avatar, Theme, createStyles, Collapse } from '@material-ui/core';

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
  
export default function NextInspectionDate() {


    const platformTypeListSubject = usePlatformTypeListContext();

    const { watch } = useFormContext();
    const risk_ranking = watch(
        'risk_ranking'
    );
    let red = (risk_ranking === 'H') ?  'orange' : (risk_ranking === 'VH') ?  'red' : (risk_ranking === 'M') ?  'yellow' : (risk_ranking === 'L') ?  'yellowgreen' : 'green';
    let risk = (risk_ranking === 'H') ?  'High (H)' : (risk_ranking === 'VH') ?  'Very High (VH)' : (risk_ranking === 'M') ?  'Medium (M)' : (risk_ranking === 'L') ?  'Low (L)' : 'Very Low (VL)';

   
    
    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>
                {/* first */}
                <Accordion>
                    <AccordionSummary>
                        <Typography>Inspection Interval Based on Risk Level</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                             <Grid item xs={12}></Grid>
                            <Grid item xs={4}>
                                <p>
                                Platform Risk Level
                                </p>

                            </Grid>
                            <Grid item xs={6}>
                                <div style={{backgroundColor: red, height:"50px"}}>
                                    <Typography style={{color: "Black",paddingTop:"13px" ,paddingLeft:"30%"}}>{risk}</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={12}></Grid>
                        </Grid>   
                        <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <div>                            
                                         <StyledImage src="/risk2.png" />
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
            <AccordionSummary style={{backgroundColor: "#68c1a8" }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">Next Inspection Date</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
