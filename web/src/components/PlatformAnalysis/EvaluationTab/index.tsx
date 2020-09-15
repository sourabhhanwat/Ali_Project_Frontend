import Box from '@material-ui/core/Box';
import { Accordion } from '@material-ui/core'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
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
import {Pie,Doughnut} from 'react-chartjs-2';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button,TextArea, Dropdown } from 'semantic-ui-react'
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import Hidden from '@material-ui/core/Hidden';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'dropdown-select/dist/css/dropdown-select.css';
import { red } from '@material-ui/core/colors';

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

function createData(lof: string, score: string) {
  return { lof, score };
}

function createData1(cof: string, ilof: string, clof: string) {
    return { cof, ilof , clof};
  }


const rows = [
  createData('5', ' ≥ 680'),
  createData('4', '>= 490 to < 680'),
  createData('3','≥ 310 to < 490' ),
  createData('2', '≥ 120 < 310'),
  createData('1','< 120' ),
];

function createData2(a: string, b: string, c: string) {
    return { a, b , c};
  }


const rows_env = [
  createData2('E', ' ≥ 50,000','Event where structural failure is expected to cause more than 50,000 equivalent bbl oil leak'),
  createData2('D', ' ≥ 5,000 to < 50,000','Event where structural failure is expected to cause between 5,000 to 50,000 equivalent bbl oil leak'),
  createData2('C', '>= 500 to < 5,000','Event where structural failure is expected to cause between 500 to 5,000 equivalent bbl oil leak'),
  createData2('B','≥ 50 to < 500', 'Event where structural failure is expected to cause between 50 to 500 equivalent bbl oil leak'),
  createData2('A', '< 50','Event where structural failure is expected to cause between 1 to 50 equivalent bbl oil leak'),
];

function createData3(a: string, b: string, c: string) {
    return { a, b , c};
  }


const rows_eco = [
  createData3('E', ' ≥ 100','The consequence of failure represents very high cost'),
  createData3('D', ' ≥ 75 - < 100','The consequence of failure represents very high cost'),
  createData3('C', '>= 45 - < 75','The consequence of failure represents  medium cost'),
  createData3('B','≥ 6 - < 45', 'The consequence of failure represents low cost'),
  createData3('A', '< 6','The consequence of failure represents very low cost'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function EvaluationTab(this: any, { hidden }: { hidden?: boolean }) {

    var modal = {
        width: '100%',
        padding: '10px 5px'

    };
    

    const { watch } = useFormContext();

    const classes = useStyles();


    const platformMannedStatusListSubject = usePlatformMannedStatusListContext();

    const platform_manned_status_id = watch('platform_manned_status_id');

    const lof_ranking = watch('lof_ranking');

    console.log("platform_manned_status_id");
    console.log(platform_manned_status_id);


    let state = {
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

    const [
        platformMannedStatusList,
        setPlatformMannedStatusList,
    ] = React.useState<platform_manned_status[]>([]);

    const handlePlatformMannedStatus = React.useCallback(
        (state: State<platform_manned_status[] | null>) => {
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

    console.log('platformMannedStatusList');
    console.log(platformMannedStatusList);

    const daily_oil_production = watch(
        'environmental_consequence.daily_oil_production'
    );
    
    console.log("I am daily => ", daily_oil_production);
    
    const environmental_consequence_description = watch(
        'environmental_consequence_description'
    );

    const calculated_economic_impact_consequence = watch(
        'calculated_economic_impact_consequence'
    );

    const calculate_economic_impact_remaining_life_services = watch(
        'calculate_economic_impact_remaining_life_services'
    );

    const structure_replacement_decision = watch(
            'structure_replacement_decision'
    );
    

    const final_consequence_category = watch(
        'final_consequence_category'
    );
    const economic_consequence_category = watch(
        'economic_consequence_category'
    );
    const environmental_consequence_category = watch(
        'environmental_consequence_category'
    );
     

    const risk_based_underwater_inspection_interval = watch(
        'risk_based_underwater_inspection_interval'
    );
    const risk_ranking = watch(
        'risk_ranking'
    );
    // calculated_environmental_consequence

    const calculated_environmental_consequence = watch(
        'calculated_environmental_consequence'
    );

    
    let calculated_environmental_consequence1 = (calculated_environmental_consequence === null) ?  'Unknown' : calculated_environmental_consequence;


    let structure_replacement_decision1 = (structure_replacement_decision === 'false') ?  'Do Not Replace' : ' Replace Structure';


    let environmental_consequence_description1 = (environmental_consequence_description === 'Unknown') ?  'environmental_consequence_description' : 'Blank';

    
    console.log("I am evaluation Tab" ,environmental_consequence_description);


    console.log("I am evaluation Tab Change" ,environmental_consequence_description1);
    
    const sizes = [ "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large" ];

    let red = (risk_ranking === 'H') ?  'red' : (risk_ranking === 'M') ?  'green' : (risk_ranking === 'L') ?  'Orange' : 'yellow';
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

            
            <Grid container spacing={2}>
                <Grid item xs={4}>
                <Typography variant="h5" gutterBottom>
                    <p></p>
                    <p>Likelihood of Failure Category</p>
                </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        {watch('lof_ranking')}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {/* // ek button */}
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        <p></p>
                        <p></p>
                    </Typography>
                    <Popup trigger={
                        <IconButton color="secondary" aria-label="add an alarm">
                        <Info />
                        </IconButton>
                    }>
                        <div >    
                            <TableContainer component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center" >LOF Ranking</StyledTableCell>
                                            <StyledTableCell align="center" >Total Score Range</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.lof}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                {row.lof}
                                            </StyledTableCell>
                                            <StyledTableCell  align="center">{row.score}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                </Grid>
            </Grid>

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
                                    name="platform_manned_status.id"
                                    subject={platformMannedStatusListSubject}
                                    label="Platform Manned Status"
                                />
                            </Grid>

                            {/* <Grid item xs={6}>
                                <p>
                                platform manned status id
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label=""
                                    name={[
                                        'platform_manned_status',
                                        'id',
                                    ]} disabled
                                />
                            </Grid> */}

                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    {platformMannedStatus?.description ??
                                        'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">
                                    Ranking
                                </Typography>
                                <Typography variant="h5">
                                    {platformMannedStatus?.ranking ?? 'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        <p></p>
                        <p></p>
                        {/* // second button */}
                        
                    </Typography>
                    <Box>
                         <Popup  trigger={      
                             <IconButton color="secondary" aria-label="add an alarm">
                              <Info />
                        </IconButton>
                        } position = 'top center' >
                        <div > 
                            <TableContainer style={{minWidth: 10}} component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Platform Manned Status</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {platformMannedStatusList.map((row) => (
                                            <StyledTableRow style={{minWidth: 10}} key={row.name}>
                                            <StyledTableCell style={{minWidth: 10}} component="th" scope="row" align="center">
                                                {row.ranking}
                                            </StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center">
                                            {row.name}   
                                            </StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center"> 
                                            
                                                    {row.description}
                                            </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                    </Box>
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
                                Calculated Environmental Consequence 
                            </Grid>

                            <Grid item xs={6}>
                                 <Typography variant="h5">
                                    {calculated_environmental_consequence1}
                                </Typography>
                                {/* <TextField
                                    disabled
                                    label="Calculated Environmental Consequence"
                                    name={[
                                        'calculated_environmental_consequence',
                                    ]}
                                    unit="Barrels of Oil Equivalent (BOE)"
                                /> */}
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>

                            <Grid item xs={4}>
                                <p></p>
                                Description
                             </Grid>
                            
                            <Grid item xs={4}>
                            <Popup trigger={
                        <IconButton color="secondary" aria-label="add an alarm">
                        <Info />
                        </IconButton>
                    }>
                        <div >    

                            <TableContainer component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                 <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Quantitative BOE</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows_env.map((row) => (
                                            <StyledTableRow key={row.a}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                {row.a}
                                            </StyledTableCell>
                                            <StyledTableCell  align="center">{row.b}</StyledTableCell>
                                            <StyledTableCell  align="center">{row.c}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                                Category
                            </Grid>

                            <Grid item xs={4}>
                            Environmental Consequence
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name= {['environmental_consequence_description']}
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
                                <Typography variant="body1">
                                    { calculated_economic_impact_consequence }
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Economic Impact Consequence (Based on Remaining Service Life)
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    { calculate_economic_impact_remaining_life_services }
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Structure Replacement Decision                                
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                             <Typography variant="body1">
                                    { structure_replacement_decision1 }
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Description</p>
                            </Grid>

                            <Grid item xs={4}>
                            <Popup trigger={
                        <IconButton color="secondary" aria-label="add an alarm">
                        <Info />
                        </IconButton>
                    }>
                        <div >    

                            <TableContainer component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                 <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Quantitative US$ Million</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows_eco.map((row) => (
                                            <StyledTableRow key={row.a}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                {row.a}
                                            </StyledTableCell>
                                            <StyledTableCell  align="center">{row.b}</StyledTableCell>
                                            <StyledTableCell  align="center">{row.c}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                                Category
                            </Grid>

                            <Grid item xs={4}>
                                <p>Economic Consequence </p>
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name={[
                                        'economic_consequence_description',
                                        // 'economic_consequence_description',
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
                                <Typography variant="h5">
                                    {environmental_consequence_category}
                                </Typography>
                                {/* <TextField
                                    label="Environmental Consequence Category"
                                    name={[
                                        'environmental_consequence_category',
                                    ]}
                                /> */}
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Economic Consequence Category
                                </p>
                         </Grid>

                            <Grid item xs={6}>
                            <Typography variant="h5">
                                    {economic_consequence_category}
                                </Typography>
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Final Consequence Category
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h5">
                                    {final_consequence_category}
                                </Typography>
                            </Grid>


                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionSummary>
                        <Typography>Risk Evaluation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <p>
                                Likelihood of Failure Category
                                </p>

                            </Grid>
                            <Grid item xs={4}>
                                 <Typography variant="h5">
                                    {lof_ranking}
                                </Typography>
                                 {/* <TextField
                                    disabled
                                    label="Likelihood of Failure Category"
                                    name={[
                                        'lof_ranking',
                                    ]}
                                    
                                /> */}
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <p>
                                Final Consequence Category                             
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography variant="h5">
                                    {final_consequence_category}
                                </Typography>
                                {/* <TextField
                                    disabled
                                    label="Final Consequence Category"
                                    name={[
                                        'final_consequence_category',
                                    ]}
                                /> */}
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <p>
                                Risk Ranking
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{color: red}} variant="h5">
                                    {risk_ranking}
                                </Typography>

                                {/* </Typography> */}
                                {/* <TextField
                                    disabled
                                    label="Risk Ranking"
                                    name={[
                                        'risk_ranking',
                                    ]}
                                /> */}
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        
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
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center"></StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">5</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center">M</StyledTableCell>
                                            <StyledTableCell  style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center">VH</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center">VH</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">Very High Risk Zone</StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">4</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center">M</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "red"}} align="center">VH</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">High Risk Zone</StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">3</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}} align="center">M</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">Medium Risk Zone</StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">2</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center">VL</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}} align="center">M</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "orange"}} align="center">H</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">Low Risk Zone</StyledTableCell></StyledTableRow>
                                            <StyledTableRow>
                                            <StyledTableCell style={{backgroundColor: "white"}} component="th" scope="row" align="center">1</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center">VL</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "green"}} align="center">VL</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellowgreen"}} align="center">L</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "yellow"}}  align="center">M</StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "Green"}} align="center"></StyledTableCell>
                                            <StyledTableCell style={{backgroundColor: "white"}}  align="center">Very Low Risk Zone</StyledTableCell></StyledTableRow>
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

            </Box>
       
        </Box>
    );
}
