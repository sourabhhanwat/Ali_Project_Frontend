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

export default function InspectionHistory() {
    const platformTypeListSubject = usePlatformTypeListContext();

    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <h3>Type of Survey Level</h3> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <h3>Data of Last Inspection </h3> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <p>Level I</p> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <DatePicker
                        name={['level_1_last_inspection_date']}
                        label="Level I"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <p>Level II</p> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <DatePicker
                        name={['level_2_last_inspection_date']}
                        label="Level II"
                        
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <p>Level III</p> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <DatePicker
                        name={['level_3_last_inspection_date']}
                        label="Level III"
                    />
                </Grid>
            
            </Grid>
        ),
        [platformTypeListSubject]
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Inspection History</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
