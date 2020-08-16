import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const SiteSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
        description: yup.string(),
        created_at: yup.date(),
        updated_at: yup.date(),
    })
    .noUnknown();

export const SiteListSchema = yup.array(SiteSchema);

declare global {
    export type Site = yup.InferType<typeof SiteSchema>;
}

export type ListParam = {
    filter?: {
        project?: number;
    };
};

class SiteListSubject extends Subject<Site[] | null> {
    list = this.createAsync(async (param: ListParam = {}) => {
        const { data } = await axios.get<Site[]>('/api/v1/sites/', {
            params: param?.filter,
            transformResponse(data) {
                return SiteListSchema.validateSync(data);
            },
        });
        return data;
    });
}

export function useSiteList(): { subject: SiteListSubject } {
    const ref = React.useRef<SiteListSubject>();

    if (!ref.current) {
        ref.current = new SiteListSubject(null);
    }

    return { subject: ref.current };
}

const SiteListContext = React.createContext<SiteListSubject>(null as any);

export function useSiteListContext(): SiteListSubject {
    return React.useContext(SiteListContext);
}

export default function SiteListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: SiteListSubject }>) {
    return (
        <SiteListContext.Provider value={subject}>
            {children}
        </SiteListContext.Provider>
    );
}
