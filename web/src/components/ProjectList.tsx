import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import ProjectCard, { SkeletonProjectCard } from './ProjectCard';
import { useProjectList } from './ProjectListProvider';
import {Pie,Doughnut} from 'react-chartjs-2';
// -----------------------
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// ---------------------

var GraphDiv = {   
    width:'500px',
    height: '800px',
    margin: 'auto',
    border: '3px solid #73AD21',
    padding: '10px',
};

// ==================
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
  

  function createData(no: string, Platform_Name: string, Primary_Function: string, Platfom_Manned_Status: string, Platform_Risk_Ranking: string,
    Exposure_Category: string, Inspection_Intervals: string, Last_Inspection_Date: string, Next_Inspection_Date: string, Next_10_year: string ) {
    return { no, Platform_Name, Primary_Function, Platfom_Manned_Status, Platform_Risk_Ranking, Exposure_Category ,  Inspection_Intervals,
        Last_Inspection_Date, Next_Inspection_Date, Next_10_year };
  }
  
  const rows = [
    createData('1', 'PP', 'Production (P)', 'Yes', 'VH','L-1', '1', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('2', 'RP', 'Production (P)', 'NO', 'H', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('3', 'WP1', 'Drilling (D)', 'Yes', 'M', 'L-1', '6', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('4', 'WP10', 'Drilling (D)', 'Yes', 'M', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('5', 'QP', 'LQ (Q)', 'Yes', 'L', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
// ==================

const StyledDivider = styled(Divider)(
    ({
        theme,
        bgcolor,
    }: {
        theme: Theme;
        bgcolor?: 'veryHigh' | 'high' | 'medium' | 'low' | 'veryLow';
    }) => ({
        backgroundColor: bgcolor
            ? theme.palette[bgcolor].main
            : theme.palette.divider,
        height: 4,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: theme.spacing(4),
        border: `1px solid ${
            bgcolor ? theme.palette[bgcolor].main : theme.palette.divider
        }`,
        borderRadius: theme.spacing(1),
    })
);

const StyledTypography = styled(Typography)({
    textTransform: 'uppercase',
    fontWeight: 800,
});

const SkeletonProjectCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((id) => (
            <Grid key={id} item xs={12}>
                <SkeletonProjectCard />
            </Grid>
        ))}
    </>
));

const state = {
    labels: ['veryHigh', 'high', 'medium',
             'low', 'veryLow'],
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
        data: [3, 3, 3, 3, 3]
      }
    ]
  }

  
export default function ProjectList(_: RouteComponentProps) {
    const { subject } = useProjectList();
    const [isPending, setIsPending] = React.useState<boolean | undefined>();
    const [projects, setProjects] = React.useState<Project[] | null>();

    const handleProjectList = (state: State<Project[] | null>) => {
        setIsPending(state.isPending);
        setProjects(state.value);
    };

    React.useEffect(() => {
        subject.attach(handleProjectList);
        subject.list();
        return () => subject.detach(handleProjectList);
    }, [subject]);

    const classes = useStyles();

    return (
        <>
            <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => subject.list()}
                        variant="contained"
                        size="large"
                        color="primary"
                        disabled={isPending}
                    >
                        Refresh
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item container spacing={1}>
                    <Grid item xs={12}>
                            <Pie
                                data={state}
                                width={500}
                                height={140}
                                options={{
                                    title:{
                                        display:true,
                                        text:'OFFSHORE FIELD-1 RISK LEVELS',
                                        fontSize:20
                                        },
                                    legend:{
                                    display:true,
                                    position:'bottom'
                                    }
                                }}
                            />
                    </Grid>  
                </Grid>

                <Grid item container spacing={1}>
                    <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>No.</StyledTableCell>
                                    <StyledTableCell align="center">Platform Name</StyledTableCell>
                                    <StyledTableCell align="center">Primary Function</StyledTableCell>
                                    <StyledTableCell align="center">Platfom Manned Status</StyledTableCell>
                                    <StyledTableCell align="center">Platform Risk Ranking</StyledTableCell>
                                    <StyledTableCell align="center">Exposure Category</StyledTableCell>
                                    <StyledTableCell align="center">Selected Next Inspection Intervals (years)</StyledTableCell>
                                    <StyledTableCell align="center">Last Inspection Date</StyledTableCell>
                                    <StyledTableCell align="center">Next Inspection Date</StyledTableCell>
                                    <StyledTableCell align="center">Recommended Inspection Plan for Next 10 years</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.no}>
                                <StyledTableCell component="th" scope="row"> {row.no}</StyledTableCell>
                                <StyledTableCell align="center">{row.Platform_Name}</StyledTableCell>
                                <StyledTableCell align="center">{row.Primary_Function}</StyledTableCell>
                                <StyledTableCell align="center">{row.Platfom_Manned_Status}</StyledTableCell>
                                <StyledTableCell align="center">{row.Platform_Risk_Ranking}</StyledTableCell>
                                <StyledTableCell align="center">{row.Exposure_Category}</StyledTableCell>
                                <StyledTableCell align="center">{row.Inspection_Intervals}</StyledTableCell>
                                <StyledTableCell align="center">{row.Last_Inspection_Date}</StyledTableCell>
                                <StyledTableCell align="center">{row.Next_Inspection_Date}</StyledTableCell>
                                <StyledTableCell align="center">{row.Next_10_year}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Grid>  
                </Grid>
                <Grid item container spacing={3}>
                    {projects?.map((project) => (
                        <Grid key={project.id} item xs={12}>
                            <ProjectCard project={project} />
                        </Grid>
                    ))}
                    {isPending && <SkeletonProjectCards />}
                </Grid>
            </Grid>
        </>
    );
}