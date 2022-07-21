import { useEffect } from 'react';
import { ELEM_REF_ATTR } from '../constants/events-registry';
import { exists, isArray, isObject } from '../utils/basics';


/**
 * `EventsRegistry` is a wrapper providing `add`, `remove` and `retrieve` functionalities to the consumer.
 * It stores a collection of events registered to an element.
 * The entire registry table is maintained as a `Map`.
 */
const EventsRegistry = (() => {
    const registry = new Map();

    const add = (elemRef, events) => registry.set(elemRef, events);

    const remove = elemRef => registry.delete(elemRef);

    const retrieve = elemRef => registry.get(elemRef);

    return { add, remove, retrieve }
})();


export default function useEventsRegistry() {
    /**
     * Function to register/PLUG-IN events to the elements that are rendered through Config descriptors.
     *
     * @param {Array of Objects} elemsEventsMap - The format of each object should be like described below:-
     *  {
     *      [ELEM_REF_ATTR.ID]: 'element id',
     *      events: {
     *          onClick: [CALLBACK_TYPES.EXEC_AND_RETURN, callbackFn]
     *      }
     *  }
     *
     * @returns null;
     */
    const registerEvents = elemsEventsMap => {
        if (!isArray(elemsEventsMap)) {
            console.log('Invalid argument `elemsEventsMap` passed, it should be an array.');
            return;
        }

        const elemRefs = elemsEventsMap.map(({ [ELEM_REF_ATTR.ID]: elemId, [ELEM_REF_ATTR.NAME]: elemName, events }) => {
            const ref = elemId || elemName;

            if (exists(ref) && isObject(events)) {
                EventsRegistry.add(ref, events);
                return ref;
            }
        }).filter(Boolean);

        // Upon unmounting of the component, we should remove the registered events' entries.
        useEffect(() => () => {
            deregisterEvents(elemRefs);
        }, []);
    }

    const deregisterEvents = elemRefs => {
        if (!isArray(elemRefs)) {
            console.log('Invalid argument `elemRefs` passed, it should be an array.');
            return;
        }

        elemRefs.forEach(EventsRegistry.remove);
    }

    const retrieveEvents = elemRef => EventsRegistry.retrieve(elemRef)

    return { registerEvents, retrieveEvents }
}