import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function MarineGrowth() {
    const { watch } = useFormContext();

    return (
        <ExpansionRow
            title="Marine Growth"
            score={watch('marine_growths_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12}>
                        Marine Growth
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
