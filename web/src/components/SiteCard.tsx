import React from 'react';
import '../modules/Subject';
import { usePlatformList } from './PlatformListProvider';
import ResourceCard, { SkeletonResourceCard } from './ResourceCard';

const HEADERS = [
    { key: 'name' as const, label: 'Name' },
    { key: 'description' as const, label: 'Description' },
];

const HEADER_LABELS = HEADERS.map((header) => header.label);

export const SkeletonSiteCard = React.memo(() => (
    <SkeletonResourceCard headers={HEADER_LABELS} />
));

export default function SiteCard({ site }: { site: Site }) {
    const { subject } = usePlatformList();

    const [platforms, setPlatforms] = React.useState<Platform[] | null>();
    const [isPending, setIsPending] = React.useState<boolean>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
    };

    React.useEffect(() => {
        subject.attach(handlePlatformList);
        subject.list({
            filter: {
                site: site.id,
            },
        });
        return () => subject.detach(handlePlatformList);
    }, [site.id, subject]);

    return (
        <ResourceCard<Platform>
            updatedAt={site.updated_at}
            isPending={isPending}
            title={`Site ${site.name}`}
            caption={site.description}
            headers={HEADERS}
            getKey={(resource) => `${resource.id}`}
            resources={platforms}
            link={`/dashboard/sites/${site.id}/platforms`}
        />
    );
}
