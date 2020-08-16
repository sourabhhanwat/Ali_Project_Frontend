import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';

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
                    <TextField
                        name={['LevelI']}
                        label="Level I"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <p>Level II</p> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['LevelII']}
                        label="Level II"
                        
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <p>Level III</p> 
                </Grid> 

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['LevelIII']}
                        label="Level III"
                    />
                </Grid>
            
            </Grid>
        ),
        [platformTypeListSubject]
    );

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Inspection History</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
