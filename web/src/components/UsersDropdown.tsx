import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const PlatformMannedStatusSchema2 = yup
    .object({
        id: yup.number(),
        username: yup.string(),
    })
    .noUnknown();

export const PlatformMannedStatusListSchema2 = yup.array(
    PlatformMannedStatusSchema2
);

declare global {
    export type platform_manned_status2 = yup.InferType<
        typeof PlatformMannedStatusSchema2
    >;
}

class PlatformMannedStatusListSubject2 extends Subject<
    platform_manned_status2[] | null
> {
    cached: null | platform_manned_status2[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<platform_manned_status2[]>(
                    '/api/v1/users/',
                    {
                        transformResponse(data) {
                            return PlatformMannedStatusListSchema2.validateSync(
                                data
                            );
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<platform_manned_status2[]>(
                '/api/v1/users/',
                {
                    transformResponse(data) {
                        return PlatformMannedStatusListSchema2.validateSync(
                            data
                        );
                    },
                }
            );
            this.cached = data;
        }

        return this.cached;
    });
}

export function usePlatformMannedStatusList2(): {
    subject: PlatformMannedStatusListSubject2;
} {
    const ref = React.useRef<PlatformMannedStatusListSubject2>();

    if (!ref.current) {
        ref.current = new PlatformMannedStatusListSubject2(null);
    }

    return { subject: ref.current };
}

const PlatformMannedStatusListContext2 = React.createContext<
    PlatformMannedStatusListSubject2
>(null as any);

export function usePlatformMannedStatusListContext2(): PlatformMannedStatusListSubject2 {
    return React.useContext(PlatformMannedStatusListContext2);
}

export default function PlatformMannedStatusListProvider2({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformMannedStatusListSubject2 }>) {
    return (
        <PlatformMannedStatusListContext2.Provider value={subject}>
            {children}
        </PlatformMannedStatusListContext2.Provider>
    );
}
