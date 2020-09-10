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

    var h3Design = {
        backgroundColor: 'light blue',

    };
    
    return (
        <ExpansionRow
            title="Marine Growth"
            score={watch('marine_growths_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={4}>
                        <h3 style={h3Design}>Data</h3> 
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <h3 style={h3Design}>Input ID No.</h3>
                    </Grid>

                    <Grid item xs={6} md={4}>
                    </Grid>

                    <Grid item xs={6} md={4}>
                            <TextField
                                name={['Data']}
                                label="Data"
                            />
                    </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                name={['InputIDNo']}
                                label="Input ID No"
                            />
                        </Grid>

                    <Grid item xs={4} md={4}>
                        <Checkbox
                            label="Display"
                            name="Display"
                        />
                    </Grid>

                </Grid>
<br></br>
<br></br>
//button table
             <Grid item xs={12}>
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
                                             <TextField
                                                name={[
                                                    'Marine_Growth_Depths',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            /></TableCell>
                                        <TableCell align="center">                                           
                                             <TextField
                                                name={[
                                                    'Marine_Growth_Depths',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            /></TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={[
                                                    'Marine_Growth_Depths',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={[
                                                    'Thickness',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={[
                                                    'Thickness',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
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
