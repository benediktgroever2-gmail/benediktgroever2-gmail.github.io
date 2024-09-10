import { useEffect, useRef, useState } from 'react';
import styles from './EventContainer.module.css';
import EventItem, { EventType, Event } from './EventItem';


type EventContainerProps = {
    events: Event[],
    callStartTimeMs: number
}

const EventContainer = (props: EventContainerProps) => {

    const [expandedId, setExpandedId] = useState<string | undefined>(undefined);
    const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>(undefined);
    const [fastTrackModeEnabled, setFastTrackMode] = useState<boolean | undefined>(true);
    const lastItemRef = useRef<HTMLDivElement | null>(null);


    // Function to handle event selection toggle
    const toggleEventSelection = (type: EventType) => {
        if(type == selectedEvent){
            setSelectedEvent(undefined)
        }else{
            setSelectedEvent(type)
        }
    };

    const toggleFastTrackMode = () => {
        if(fastTrackModeEnabled){
            setFastTrackMode(false)
        }else{
            setFastTrackMode(true);
            if (lastItemRef.current) {
                lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    useEffect(() => {
      if (lastItemRef.current && fastTrackModeEnabled) {
        lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [props.events]); // Run this effect whenever the items array changes

    return (
        <div className={styles.eventContainer}>
            <div className={styles.eventListContainer}>
                {props.events.map((event: Event, index) => (
                     selectedEvent === undefined || selectedEvent === event.type  ? (
                        <EventItem
                            key={index}
                            event={event}
                            expanded={ fastTrackModeEnabled ? index === props.events.length - 1 : event.id === expandedId}
                            ref={index === props.events.length - 1 ? lastItemRef : null} // Set ref on the last item
                            onClickExpand={() => {
                                if(event.id == expandedId){
                                    setExpandedId(undefined)
                                }else{
                                    setExpandedId(event.id)
                                }
                            }}
                        />
                    ) : null
                ))}
            </div>
            <div className={styles.eventFilterContainer}>
                <div className={styles.eventFilterSubContainer}>
                    <div className={`${styles.eventListFilter} ${selectedEvent === EventType.Compedition ? styles.eventListFilterActive : ''}`} onClick={ () => { toggleEventSelection(EventType.Compedition)}}>
                        🏎
                        <div className={styles.hoverText} > Competition info </div>
                    </div>
                    <div className={`${styles.eventListFilter} ${ selectedEvent == EventType.Product ? styles.eventListFilterActive : ''}`} onClick={ () => { toggleEventSelection(EventType.Product)}}>
                        📄
                        <div className={styles.hoverText}> Product detail </div>
                    </div>
                </div>
                <div className={styles.eventFilterSubContainer}>
                    <div className={`${styles.eventListFilter} ${ fastTrackModeEnabled ? styles.eventListFilterActive : ''}`} onClick={toggleFastTrackMode}>
                        Track
                        <div className={styles.hoverText}> Track most recent events </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventContainer;