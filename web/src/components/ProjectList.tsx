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

var GraphDiv = {   
    width:'500px',
    height: '800px',
    margin: 'auto',
    border: '3px solid #73AD21',
    padding: '10px',
};

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