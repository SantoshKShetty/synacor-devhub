import { useEffect } from 'react';

let EVENTS_REGISTER = {};

export default function useEventsRegistry() {
    const registerEvents = events => {
        EVENTS_REGISTER = { ...EVENTS_REGISTER, ...events };

        useEffect(() => () => {
            deregisterEvents(Object.keys(events));
        }, []);
    }

    const deregisterEvents = eventKeys => {
        console.log('de registering events with keys - ', eventKeys)
    }

    const retrieveEvents = elemKey => {
        return EVENTS_REGISTER[elemKey];
    }

    return { registerEvents, retrieveEvents }
}