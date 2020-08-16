import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import PlatformCard, { SkeletonPlatformCard } from './PlatformCard';
import { usePlatformList } from './PlatformListProvider';

const SkeletonPlatformCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SkeletonPlatformCard />
            </Grid>
        ))}
    </>
));

export default function PlatformsList(_: RouteComponentProps) {
    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
    };

    let siteId: number | undefined;

    const match = useMatch('/dashboard/sites/:siteId/platforms');

    if (match) {
        siteId = parseInt((match as any).siteId);
    }

    const fetch = React.useCallback(() => {
        if (siteId) {
            platformList.subject.list({
                filter: {
                    site: siteId,
                },
            });
        } else {
            platformList.subject.list(undefined);
        }
    }, [siteId, platformList.subject]);

    React.useEffect(() => {
        platformList.subject.attach(handlePlatformList);
        fetch();
        return () => platformList.subject.detach(handlePlatformList);
    }, [fetch, platformList.subject]);

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
                {platforms?.map((platform) => (
                    <Grid key={platform.id} item xs={12} sm={6} md={4} lg={3}>
                        <PlatformCard platform={platform} />
                    </Grid>
                ))}
                {isPending && <SkeletonPlatformCards />}
            </Grid>
        </>
    );
}
