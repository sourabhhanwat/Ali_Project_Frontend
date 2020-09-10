// import axios from 'axios';
// import React, { PropsWithChildren } from 'react';
// import * as yup from 'yup';
// import Subject from '../modules/Subject';

// export const PlatformUserSchema = yup
//     .object({
//         id: yup.number(),
//         password: yup.string(),
//         last_login: yup.string(),
//         is_superuser:yup.boolean(),
//         username: yup.string(),
//         first_name: yup.string(),
//         last_name: yup.string(),
//         email: yup.string(),
//         date_joined: yup.string(),
//         is_staff:yup.boolean(),
//         is_active:yup.boolean(),
//     })
//     .noUnknown();

// export const PlatformUserListSchema = yup.array(
//     PlatformUserSchema
// );

// declare global {
//     export type PlatformUser = yup.InferType<
//         typeof PlatformUserSchema
//     >;
// }

// class PlatformUserListSubject extends Subject<
//     PlatformUser[] | null
// > {
//     cached: null | PlatformUser[] = null;

//     list = this.createAsync(async ({ cached }: { cached: boolean }) => {
//         if (cached) {
//             if (!this.cached) {
//                 const { data } = await axios.get<PlatformUser[]>(
//                     '/api/v1/users/',
//                     {
//                         transformResponse(data) {
//                             return PlatformUserListSchema.validateSync(
//                                 data
//                             );
//                         },
//                     }
//                 );
//                 this.cached = data;
//             }
//         } else {
//             const { data } = await axios.get<PlatformUser[]>(
//                 '/api/v1/users/',
//                 {
//                     transformResponse(data) {
//                         return PlatformUserListSchema.validateSync(
//                             data
//                         );
//                     },
//                 }
//             );
//             this.cached = data;
//         }

//         return this.cached;
//     });
// }

// export function usePlatformUserStatusList(): {
//     subject: PlatformUserListSubject;
// } {
//     const ref = React.useRef<PlatformUserListSubject>();

//     if (!ref.current) {
//         ref.current = new PlatformUserListSubject(null);
//     }

//     return { subject: ref.current };
// }

// const PlatformUserStatusListContext = React.createContext<
//     PlatformUserListSubject
// >(null as any);

// export function usePlatformUserStatusListContext(): PlatformUserListSubject {
//     return React.useContext(PlatformUserStatusListContext);
// }

// export default function PlatformUserStatusListProvider({
//     children,
//     subject,
// }: PropsWithChildren<{ subject: PlatformUserListSubject }>) {
//     return (
//         <PlatformUserStatusListContext.Provider value={subject}>
//             {children}
//         </PlatformUserStatusListContext.Provider>
//     );
// }

import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const PlatformMannedStatusSchema = yup
    .object({
        id: yup.number(),
        password: yup.string(),
        last_login: yup.string(),
        is_superuser:yup.boolean(),
        username: yup.string(),
        first_name: yup.string(),
        last_name: yup.string(),
        email: yup.string(),
        date_joined: yup.string(),
        is_staff:yup.boolean(),
        is_active:yup.boolean(),
        groups:yup.string(),
        user_permissions:yup.string(),
    })
    .noUnknown();

export const PlatformMannedStatusListSchema = yup.array(
    PlatformMannedStatusSchema
);

declare global {
    export type platform_user_status = yup.InferType<
        typeof PlatformMannedStatusSchema
    >;
}

class PlatformMannedStatusListSubject extends Subject<
    platform_user_status[] | null
> {
    cached: null | platform_user_status[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<platform_user_status[]>(
                    '/api/v1/users/',
                    {
                        transformResponse(data) {
                            return PlatformMannedStatusListSchema.validateSync(
                                data
                            );
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<platform_user_status[]>(
                '/api/v1/users/',
                {
                    transformResponse(data) {
                        return PlatformMannedStatusListSchema.validateSync(
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

export function usePlatformMannedStatusList(): {
    subject: PlatformMannedStatusListSubject;
} {
    const ref = React.useRef<PlatformMannedStatusListSubject>();

    if (!ref.current) {
        ref.current = new PlatformMannedStatusListSubject(null);
    }

    return { subject: ref.current };
}

const PlatformMannedStatusListContext = React.createContext<
    PlatformMannedStatusListSubject
>(null as any);

export function usePlatformMannedStatusListContext(): PlatformMannedStatusListSubject {
    return React.useContext(PlatformMannedStatusListContext);
}

export default function PlatformMannedStatusListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformMannedStatusListSubject }>) {
    return (
        <PlatformMannedStatusListContext.Provider value={subject}>
            {children}
        </PlatformMannedStatusListContext.Provider>
    );
}
