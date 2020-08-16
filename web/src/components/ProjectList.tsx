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
                <Box clone height="100%">
                    <Grid item xs={6} sm={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h3">0</Typography>
                                <StyledDivider bgcolor="veryHigh" />
                                <StyledTypography variant="caption">
                                    Very High
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
                <Box clone height="100%">
                    <Grid item xs={6} sm={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h3">1</Typography>
                                <StyledDivider bgcolor="high" />
                                <StyledTypography variant="caption">
                                    High
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
                <Grid item xs={6} sm={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3">7</Typography>
                            <StyledDivider bgcolor="medium" />
                            <StyledTypography variant="caption">
                                Medium
                            </StyledTypography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3">7</Typography>
                            <StyledDivider bgcolor="low" />
                            <StyledTypography variant="caption">
                                Low
                            </StyledTypography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3">7</Typography>
                            <StyledDivider bgcolor="veryLow" />
                            <StyledTypography variant="caption">
                                Very Low
                            </StyledTypography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3">7</Typography>
                            <StyledDivider />
                            <StyledTypography variant="caption">
                                Total
                            </StyledTypography>
                        </CardContent>
                    </Card>
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
