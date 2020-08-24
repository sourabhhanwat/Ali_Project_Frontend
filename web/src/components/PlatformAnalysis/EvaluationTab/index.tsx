import Box from '@material-ui/core/Box';
import { Accordion } from '@material-ui/core'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../../modules/Subject';
import Checkbox from '../../FormWidget/Checkbox';
import Select from '../../FormWidget/Select';
import { usePlatformMannedStatusListContext } from '../../PlatformMannedStatusListProvider';
import ExpansionRow from '../ExpansionRow';
import AdditionalAppurtenance from './AdditionalAppurtenance';
import BraceLegs from './BraceLegs';
import Corrosion from './Corrosion';
import DeckElevationWaveInDeck from './DeckElevationWaveInDeck';
import DeckLoad from './DeckLoad';
import FatigueLoad from './FatigueLoad';
import FloodedMember from './FloodedMember';
import GroutedPiles from './GroutedPiles';
import LastInspection from './LastInspection';
import MarineGrowth from './MarineGrowth';
import MechanicalDamage from './MechanicalDamage';
import PlatformVintage from './PlatformVintage';
import Scour from './Scour';
import ShallowGas from './ShallowGas';
import UnprotectedAppurtenances from './UnprotectedAppurtenances';
import TextField from '../../FormWidget/TextField';

export default function EvaluationTab({ hidden }: { hidden?: boolean }) {
    const { watch } = useFormContext();

    const platformMannedStatusListSubject = usePlatformMannedStatusListContext();

    const platform_manned_status_id = watch('platform_manned_status_id');


    // var ButtonDesign = {
        
    //     backgroundColor: 'yellow',
    //     padding:    '15px 32px',
    //     margin: '4px 2px',

    // };

    const [
        platformMannedStatusList,
        setPlatformMannedStatusList,
    ] = React.useState<PlatformMannedStatus[]>([]);

    const handlePlatformMannedStatus = React.useCallback(
        (state: State<PlatformMannedStatus[] | null>) => {
            setPlatformMannedStatusList(state.value ?? []);
        },
        []
    );

    React.useEffect(() => {
        platformMannedStatusListSubject.attach(handlePlatformMannedStatus);
        return () =>
            platformMannedStatusListSubject.detach(handlePlatformMannedStatus);
    }, [platformMannedStatusListSubject, handlePlatformMannedStatus]);

    const platformMannedStatus = React.useMemo(
        () =>
            platformMannedStatusList.find(
                (value) => value.id === platform_manned_status_id
            ),
        [platform_manned_status_id, platformMannedStatusList]
    );

    const daily_oil_production = watch(
        'environmental_consequence.daily_oil_production'
    );

    // const reserve_strength_ratio =
    //     watch('reserve_strength_ratio_score.reserve_strength_ratio') ??
    //     'unknown';

    return (
        <Box hidden={hidden}>
            <Typography variant="h4" gutterBottom>
                Likelihood of Failure Calculation
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Checkbox
                                    name="reserve_strength_ratio_score.rsr_override"
                                    label="Override RSR?"
                                />
                            </TableCell>
                            <TableCell>
                                <Box clone fontWeight="fontWeightBold">
                                    <Typography variant="body2">
                                        RSR Override
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box clone fontWeight="fontWeightBold">
                                    <Typography variant="body2">
                                        Evaluated Score
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <ExpansionRow
                            title="Robustness Score"
                            score={watch('robustness_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <PlatformVintage />
                                    <BraceLegs />
                                    <GroutedPiles />
                                    <ShallowGas />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <ExpansionRow
                            title="Condition Score"
                            score={watch('condition_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <LastInspection />
                                    <MechanicalDamage />
                                    <Corrosion />
                                    <MarineGrowth />
                                    <Scour />
                                    <FloodedMember />
                                    <UnprotectedAppurtenances />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <ExpansionRow
                            title="Loading Score"
                            score={watch('loading_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <DeckLoad />
                                    <DeckElevationWaveInDeck />
                                    <AdditionalAppurtenance />
                                    <FatigueLoad />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>RSR Override Score</TableCell>
                            <TableCell>{watch('rsr_override_score')}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>Total Score</TableCell>
                            <TableCell>{watch('total_score')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" gutterBottom>
                Likelihood of Failure Category {watch('lof_ranking')}
            </Typography>

            <Typography variant="h4" gutterBottom>
                Consequence of Failure Calculation
            </Typography>

            <Box>
                <Accordion defaultExpanded>
                    <AccordionSummary>
                        <Typography>Life-Safety Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select
                                    toOption={(option) => option}
                                    name="platform_manned_status_id"
                                    subject={platformMannedStatusListSubject}
                                    label="Platform Manned Status"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    {platformMannedStatus?.description ??
                                        'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    Ranking
                                </Typography>
                                <Typography variant="h5">
                                    {platformMannedStatus?.ranking ?? 'Unknown'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />
                
                <Accordion>
                    <AccordionSummary>
                        <Typography>Environmental Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <p>
                                Estimated Fraction of Oil Production Loss Due to Leakage
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Estimated Fraction of Oil Production Loss Due to Leakage"
                                    name={[
                                        'environmental_consequence',
                                        'estimated_fraction_of_oil_production_loss_due_to_leakage',
                                    ]}
                                    unit="%"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Estimated Fraction of Oil Production Loss Due to LeakageFixed Cost for Spill Clean-up (Includes, mobilization of clean-up personnel, regulatory costs, etc.)
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fixed Cost for Spill Clean-up"
                                    name={[
                                        'environmental_consequence',
                                        'fixed_cost_for_spill_cleanup',
                                    ]}
                                    unit="$"
                                    helperText="Includes, mobilization of clean-up personnel, regulatory costs, etc"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Variable Cost for Spill Clean-up (based on the size of spill volume)                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Variable Cost for Spill Clean-up"
                                    name={[
                                        'environmental_consequence',
                                        'variable_cost_for_spill_cleanup',
                                    ]}
                                    unit="$/bbl"
                                    helperText="Based on the size of spill volume"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Oil Price
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Oil Price"
                                    name={[
                                        'environmental_consequence',
                                        'oil_price',
                                    ]}
                                    unit="$/bbl"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Environmental Consequence 
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Calculated Environmental Consequence"
                                    name={[
                                        'Calculated_Environmental_Consequence',
                                        // 'oil_price',
                                    ]}
                                    unit="Barrels of Oil Equivalent (BOE)"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                {/* <Typography variant="subtitle2">
                                    Calculated Environmental Consequence
                                </Typography>
                                <Typography variant="h5">
                                    {watch(
                                        'calculated_environmental_consequence'
                                    ) ?? 'None'}
                                </Typography> */}
                            </Grid>

                            <Grid item xs={4}>
                                <p>Description</p>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Category</p>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Environmental Consequence</p>
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name={[
                                        'environmental_consequence_description',
                                        // 'oil_price',
                                    ]}
                                />
                            </Grid>

                            <Grid item xs={4}>
                            <Select
                                    toOption={(option) => option}
                                    name="environmental_consequence_category"
                                    subject={platformMannedStatusListSubject}
                                    label="Category"
                                />
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            
                <br />

                <Accordion>
                    <AccordionSummary>
                        <Typography>Economic Impact Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <p>
                                Gas Price
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Gas Price"
                                    name={[
                                        'economic_impact_consequence',
                                        'gas_price',
                                    ]}
                                    unit="$/mscf"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Discount Rate for Interrupted Production                               
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Discount Rate for Interrupted Production"
                                    name={[
                                        'economic_impact_consequence',
                                        'discount_date_for_interrupted_production',
                                    ]}
                                    unit="%"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Fraction of Remaining Production Loss
                                </p>
                         </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Fraction of Remaining Production Loss"
                                    name={[
                                        'economic_impact_consequence',
                                        'fraction_of_remaining_production_loss',
                                    ]}
                                    unit="%"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Platform Replacement Cost
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Platform Replacement Cost"
                                    name={[
                                        'economic_impact_consequence',
                                        'platform_replacement_cost',
                                    ]}
                                    unit="$"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Platform Replacement Time
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Platform Replacement Time"
                                    name={[
                                        'economic_impact_consequence',
                                        'platform_replacement_time',
                                    ]}
                                    unit="Days"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Economic Impact Consequence
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Calculated Economic Impact Consequence"
                                    name={[
                                        // 'economic_impact_consequence',
                                        'Calculated_Economic_Impact_Consequence',
                                    ]}
                                    unit="US$ Million"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Economic Impact Consequence (Based on Remaining Service Life)
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Calculated Economic Impact Consequence"
                                    name={[
                                        // 'economic_impact_consequence',
                                        'Calculated_Economic_Impact_Consequence',
                                    ]}
                                    unit="US$ Million"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Structure Replacement Decision                                
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Structure Replacement Decision"
                                    name={[
                                        // 'economic_impact_consequence',
                                        'Structure_Replacement_Decision',
                                    ]}
                                />
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Description</p>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Category</p>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Economic Consequence </p>
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name={[
                                        // 'economic_impact_consequence',
                                        'economic_consequence_description',
                                    ]}
                                />
                            </Grid>

                            <Grid item xs={4}>
                            <Select
                                    toOption={(option) => option}
                                    name="economic_consequence_category"
                                    subject={platformMannedStatusListSubject}
                                    label="Category"
                                />
                            </Grid>


                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionSummary>
                        <Typography>Final Consequence Level</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <p>
                                Life-Safety Consequence Category
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5">
                                    {platformMannedStatus?.ranking ?? 'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Environmental Consequence Category                              
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Environmental Consequence Category"
                                    name={[
                                        'environmental_consequence_description',
                                    ]}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Economic Consequence Category
                                </p>
                         </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Economic Consequence Category"
                                    name={[
                                        'economic_consequence_description',
                                    ]}
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Final Consequence Category
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled={daily_oil_production === 0}
                                    label="Final Consequence Category"
                                    name={[
                                        'environmental_consequence',
                                        'variable_cost_for_spill_cleanup',
                                    ]}
                                />
                            </Grid>

                            {/* <Grid item xs={4}>
                                {/* <Typography variant="subtitle2">
                                    Calculated Environmental Consequence
                                </Typography>
                                <Typography variant="h5">
                                    {watch(
                                        'calculated_environmental_consequence'
                                    ) ?? 'None'}
                                </Typography> 
                            </Grid>
                            <Grid item xs={4}>
                                <button style={ButtonDesign} type="submit"><b>SAVE</b></button>
                            </Grid>
                            <Grid item xs={4}>
                                <button style={ButtonDesign} type="submit"><b>Calculate</b></button>
                            </Grid> */}


                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionSummary>
                        <Typography>Risk Evaluation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                        <Grid item xs={4}>
                                <p>
                                Likelihood of Failure Category
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled={daily_oil_production === 0}
                                    label="Likelihood of Failure Category"
                                    name={[
                                        'environmental_consequence',
                                        'estimated_fraction_of_oil_production_loss_due_to_leakage',
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <p>
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <p>
                                Final Consequence Category                             
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Final Consequence Category"
                                    name={[
                                        'environmental_consequence',
                                        'fixed_cost_for_spill_cleanup',
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <p>
                                </p>
                            </Grid>

                            <Grid item xs={4}>
                                <p>
                                Risk Ranking
                                </p>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Risk Ranking"
                                    name={[
                                        'environmental_consequence',
                                        'variable_cost_for_spill_cleanup',
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <p>
                                </p>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Box>
       
        </Box>
    );
}