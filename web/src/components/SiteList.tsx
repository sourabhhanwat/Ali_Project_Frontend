import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import SiteCard, { SkeletonSiteCard } from './SiteCard';
import { useSiteList } from './SiteListProvider';

const SkeletonSiteCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((id) => (
            <Grid key={id} item xs={12}>
                <SkeletonSiteCard />
            </Grid>
        ))}
    </>
));

export default function SiteList(_: RouteComponentProps) {
    const { subject } = useSiteList();
    const [isPending, setIsPending] = React.useState<boolean | undefined>();
    const [sites, setSites] = React.useState<Site[] | null>();

    const handleProjectList = (state: State<Site[] | null>) => {
        setIsPending(state.isPending);
        setSites(state.value);
    };

    let projectId: number | undefined;

    const match = useMatch('/dashboard/projects/:projectId/sites');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }

    const fetch = React.useCallback(() => {
        if (projectId) {
            subject.list({
                filter: {
                    project: projectId,
                },
            });
        } else {
            subject.list(undefined);
        }
    }, [projectId, subject]);

    React.useEffect(() => {
        subject.attach(handleProjectList);
        fetch();
        return () => subject.detach(handleProjectList);
    }, [fetch, subject]);

    return (
        <>
            <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => fetch()}
                        variant="contained"
                        size="large"
                        color="primary"
                        disabled={isPending}
                    >
                        Refresh
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {sites?.map((site) => (
                    <Grid key={site.id} item xs={12}>
                        <SiteCard site={site} />
                    </Grid>
                ))}
                {isPending && <SkeletonSiteCards />}
            </Grid>
        </>
    );
}
