"use client";

import {SessionProvider} from 'next-auth/react'
import  {RecoilRoot, recoil} from 'recoil'
const SessionWrapper = ({children}) => {
    return (
        <SessionProvider>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </SessionProvider>
    )
}

export default SessionWrapper;