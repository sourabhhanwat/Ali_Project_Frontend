import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
// 
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';


import MaterialTable from 'material-table'
import { IconButton } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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



const rows = [
  createData('5', ' ≥ 680'),
  createData('4', '>= 490 to < 680'),
  createData('3','≥ 310 to < 490' ),
  createData('2', '≥ 120 < 310'),
  createData('1','< 120' ),
];


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


// 

export default function MarineGrowth() {
    const { watch } = useFormContext();
    const classes = useStyles();
    
    return (
        <ExpansionRow
            title="Marine Growth"
            score={watch('marine_growths_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                     <Grid item container xs={12} md={10} spacing={2}>
                        <Grid item xs={12}>
                                <Typography variant="body1">
                                        <h3>Data</h3>
                                </Typography>
                                <Typography variant="subtitle2">
                                    Marine Growth Inspection Performed and Elevations of Inspection Marine Growth are Known?
{/*                                 
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <Add />
                                </IconButton> */}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <h3>Marine Growth Depths :</h3>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                name={['marine_growth_depths_from_el']}
                                label="insert From EL"
                                unit="m"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                name={['marine_growth_depths_to_el']}
                                label="insert TO EL"
                                unit="m"
                            />
                        </Grid>
                        <Grid item xs={6} md={3}></Grid>

                        <Grid item xs={6} md={3}>
                            <h3> Marine Growth Inspected Thickness </h3>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['marine_growth_inspected_thickness']}
                                label="insert Marine Growth Inspected Thickness"
                                unit="mm"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}></Grid>

                        <Grid item xs={6} md={3}>
                            <h3> Marine Growth Allowable Design Thickness </h3>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['marine_growth_design_thickness']}
                                label="insert Marine Growth Allowable Design Thick"
                                unit="mm"
                            />
                        </Grid>

                    </Grid>

<br></br>
<br></br>
             <Grid item xs={12}> 
             <h3>Table:</h3>            
                        <TableContainer component={Paper} elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2} align="center"> Marine Growth Depths</TableCell>
                                        <TableCell align="center">Marine Growth Inspected Thickness (mm)</TableCell>
                                        <TableCell align="center">Marine Growth Allowable Design Thickness (mm)</TableCell>
                                        <TableCell align="center">Evaluated Score at Each Elevation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"> From EL (m)</TableCell>
                                        <TableCell align="center"> To EL (m) </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">                                           
                                            {watch('marine_growths_score')}
                                        </TableCell>
                                        <TableCell align="center">                                           
                                            {watch('marine_growths_score')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {watch('marine_growths_score')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {watch('marine_growths_score')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {watch('marine_growth_each_elevation')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid> 
            </Box>
        </ExpansionRow>
    );
}
