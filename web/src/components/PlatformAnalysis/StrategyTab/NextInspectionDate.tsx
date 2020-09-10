import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import {Pie,Doughnut} from 'react-chartjs-2';
import DatePicker from '../../FormWidget/DatePicker';

export default function NextInspectionDate() {

    var GraphDesign = {   
        width:'500px',
        height: '500px',
    };

    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
          }
        ]
      }

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
                                        'Platform_Risk_Level',
                                    ]}
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
                                        'yers',
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                        <Grid container spacing = {1}>
                            <Grid item xs={12}>
                                <div>
                                    <Pie
                                        data={state}
                                        options={{
                                            title:{
                                            display:true,
                                            text:'Average Rainfall per month',
                                            fontSize:20
                                            },
                                            legend:{
                                            display:true,
                                            position:'right'
                                            }
                                        }}
                                    />
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
                            />
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
                            />
                        </Grid>         
                    
                        <Grid item xs={12} md={6}>
                            <p>Level II</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level_2']}
                                label="Level II"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <p>Level III</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['exposure_category_level_3']}
                                label="Level III"
                                nullable
                            />
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
                            name={['Inspection_Interval']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <DatePicker
                            label="Inspection Date"
                            name={['level_1_inspection_date']}
                            required
                        />
                    </Grid>        
                
                    <Grid item xs={6} md={3}>
                        <p>Level II</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                    <DatePicker
                        label="Inspection Date"
                        name={['level_2_inspection_date']}
                        required
                    />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <p>Level III</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                    <DatePicker
                        label="Inspection Date"
                        name={['level_3_inspection_date']}
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
