import { ForwardedRef, forwardRef } from 'react';
import styles from './EventItem.module.css';

export enum EventType {
  Compedition = "competition",
  Product = "product",
}

export type Event = {
  id: string,
  type: EventType,
  timeMs: number,
}

type EventItemProps = {
  event: Event,
  expanded: boolean,
  onClickExpand: () => void,
}

const EventItem = forwardRef<HTMLDivElement, EventItemProps>((props: EventItemProps, ref: ForwardedRef<HTMLDivElement>) => {

  const diff = Math.abs(props.event.timeMs) / 1000.0;
  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor((diff % 60));

  return (
    <div ref={ref} className={styles.eventItem}>
      <div className={styles.eventHeader}>
        <div className={styles.eventTitle}> 
          <div className={styles.eventIcon}> { props.event.type == EventType.Compedition ? '🏎' : '📄'}</div>
          <div className={styles.eventName}>  { `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` } </div>
        </div>
        <div className={styles.expandButton} onClick={props.onClickExpand}> 
          { props.expanded ? "Hide" : "More" } 
        </div>
      </div>
      <div className={`${styles.eventDescription} ${props.expanded ? styles.eventDescriptionActive : ''}`}> 
        <div>
          Event description
        </div>
        <div>
          <div>Link 1</div><div>Link 2</div><div>Link 3</div>
        </div>
      </div>
    </div>
  );
});

export default EventItem;