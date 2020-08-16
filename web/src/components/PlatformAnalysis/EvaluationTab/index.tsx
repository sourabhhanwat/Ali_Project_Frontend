import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary>
                        <Typography>Life-Safety Consequence</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Typography>Environmental Consequence</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={daily_oil_production === 0}
                                    label="Estimated Fraction of Oil Production Loss Due to Leakage"
                                    name={[
                                        'environmental_consequence',
                                        'estimated_fraction_of_oil_production_loss_due_to_leakage',
                                    ]}
                                    unit="%"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={daily_oil_production === 0}
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
                                <TextField
                                    disabled={daily_oil_production === 0}
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
                                <TextField
                                    disabled={daily_oil_production === 0}
                                    label="Oil Price"
                                    name={[
                                        'environmental_consequence',
                                        'oil_price',
                                    ]}
                                    unit="$/bbl"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">
                                    Calculated Environmental Consequence
                                </Typography>
                                <Typography variant="h5">
                                    {watch(
                                        'calculated_environmental_consequence'
                                    ) ?? 'None'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        </Box>
    );
}
