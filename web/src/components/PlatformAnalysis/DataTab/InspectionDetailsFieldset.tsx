import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import DatePicker from '../../FormWidget/DatePicker';
import TextField from '../../FormWidget/TextField';

export default function StructuralDetailsFieldset() {
    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <DatePicker
                        label="Last Underwater Inspection Date"
                        name={[
                            'last_inspection',
                            'last_underwater_inspection_date',
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['last_inspection', 'rbui_inspection_interval']}
                        label="RBUI Inspection Interval"
                        unit="years"
                        nullable
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name={['anode_grade']} label="Anode Grade" />
                </Grid>

                <Hidden smDown>
                    <Grid item xs={12} md={6} />
                </Hidden>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'scour',
                            'measured_scour_depth_during_inspection',
                        ]}
                        label="Measured Scour Depth"
                        unit="m"
                        nullable
                    />
                </Grid>

                <Hidden smDown>
                    <Grid item xs={12} md={6} />
                </Hidden>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'mechanical_damage',
                            'number_of_damaged_members',
                        ]}
                        label="Number of Damaged Members"
                        nullable
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'flooded_member',
                            'number_of_flooded_members_in_last_inspection',
                        ]}
                        label="Number of Flooded Members in Last Inspection"
                        nullable
                    />
                </Grid>
            </Grid>
        ),
        []
    );
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Inspection Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
}