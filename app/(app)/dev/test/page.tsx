"use client"

import { JSX } from 'react'
import { Button } from '@/components/ui/button'
import { createEvent, getCalander } from "@/libs/googles/calander";

export default function TestPg(): JSX.Element {

    async function getCalanderTest() {
        const data = await getCalander()
    }

    async function addEvtTest() {
        const data = await createEvent()
        console.log(data)
    }

    return (
        <div className='mt-20 m-auto h-screen flex flex-col gap-2'>
            <Button onClick={getCalanderTest}>Get Calendar Data</Button>
            <Button onClick={addEvtTest}>Add Event</Button>
        </div>
    )
}
