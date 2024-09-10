import { useEffect, useState } from 'react';
import './App.css';
import EventContainer from './Events/EventContainer';
import { EventType, Event } from './Events/EventItem';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const callStartTimeMs = Date.now();  // assuming you have some reference start time

  // Function to generate a random event
  const addRandomEvent = () => {
    const eventTypes = [EventType.Compedition, EventType.Product]; // Add your event types here
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const timeMs = Date.now() - callStartTimeMs
    const event = {
      id: `${timeMs}`,
      type: randomType,
      timeMs: timeMs,  // current time relative to the call start
    };
    setEvents((prevEvents) => {
      return [...prevEvents, event]
    });
  };

  // useEffect to generate events at random intervals
  useEffect(() => {
    const createRandomInterval = () => {
      const randomTime = Math.random() * 10000; // Random time between 0 and 4000 ms (0 to 4 seconds)
      return setTimeout(() => {
        addRandomEvent();
        createRandomInterval();  // Recursively create new random intervals
      }, randomTime);
    };

    const timeoutId = createRandomInterval(); // Start the first event

    // Cleanup function to clear the interval on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <EventContainer events={events} callStartTimeMs={callStartTimeMs} />
  );
}

export default App;
