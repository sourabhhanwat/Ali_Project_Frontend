import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';

export default function NextInspectionDate() {

    var ButtonDesign = {
        
        backgroundColor: 'yellow',
        padding:    '15px 32px',
        margin: '4px 2px',

    };

    const platformTypeListSubject = usePlatformTypeListContext();
    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>

                    <Grid item xs={12} md={6}>
                        <h3>Inspection Interval Based on Risk Level</h3> 
                    </Grid>
                {/* first */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <p>Platform Risk Level</p> 
                        </Grid> 
                        <Grid item xs={6} md={3}>
                            <TextField
                                name={['risk_level']}
                                label="Risk Level"
                            />
                        </Grid>
                    
                        {/* table */}
                        <Grid item xs={12} md={6}>
                            <p>Graph will Come here</p> 
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <p>Risk Based Underwater Inspection Interval (Years)</p> 
                        </Grid> 

                        <Grid item xs={6} md={3}>
                            <TextField
                                name={['inspection_interval']}
                                label="Inspection Interval"
                            />
                        </Grid>
                </Grid> 


                <Grid item xs={12} md={6}>
                        <h3>Inspection Interval based on Exposure Category</h3> 
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <p>Exposure Category Level</p> 
                    </Grid> 

                    <Grid item xs={6} md={3}>
                        <TextField
                            name={['exposure_category']}
                            label="Level"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <p>Type of Survey Level</p> 
                    </Grid> 
                     
                    <Grid item xs={6} md={3}>
                        <p>Inspection Interval (Years)</p> 
                    </Grid> 
                </Grid>
                
                <Grid container spacing={2}>

                    <Grid item xs={6} md={3}>
                        <p>Level I</p> 
                    </Grid> 

                    <Grid item xs={6} md={3}>
                        <TextField
                            name={['date_inspection1']}
                            label="Level I"
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                </Grid>           
                
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <p>Level II</p> 
                    </Grid> 

                    <Grid item xs={6} md={3}>
                        <TextField
                            name={['date_inspection2']}
                            label="Level II"
                        />
                    </Grid>
                </Grid>

                 <Grid item xs={12} md={6}>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <p>Level III</p> 
                    </Grid> 

                    <Grid item xs={6} md={3}>
                        <TextField
                            name={['date_inspection3']}
                            label="Level III"
                        />
                    </Grid>
                </Grid> 

                <Grid item xs={12} md={6}>
                        <h3>Selected Next Inspection Interval and Inspection Date</h3> 
                </Grid>

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

                </Grid>
                
                <Grid container spacing={3}>

                    <Grid item xs={6} md={3}>
                        <p>Level I</p> 
                    </Grid> 

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Interval"
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Date"
                        />
                    </Grid>

                </Grid>

                <Grid item xs={12} md={6}>
                </Grid>           
                
                <Grid container spacing={3}>
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
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Date"
                        />
                    </Grid>
                </Grid>

                 <Grid item xs={12} md={6}>
                </Grid>

                <Grid container spacing={3}>
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
                        <TextField
                            name={['date_inspection1']}
                            label="Inspection Date"
                        />
                    </Grid>
                </Grid> 
            
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <button style={ButtonDesign} type="submit"><b>SAVE</b></button>
                    </Grid>
                </Grid>

            </Grid>
        ),
        [platformTypeListSubject]
    );

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Next Inspection Date</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
