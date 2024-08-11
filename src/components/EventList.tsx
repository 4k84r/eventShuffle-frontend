import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, createEvent } from "../apiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "../App.css";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [eventDates, setEventDates] = useState<Date[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
      } catch (error) {
        toast.error("Failed to fetch events.");
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const dates = eventDates.map((date) => date.toISOString().split("T")[0]);
    try {
      await createEvent(eventName, dates);
      toast.success("Event created successfully!");
      const events = await getEvents();
      setEvents(events);
      setEventName("");
      setEventDates([]);
      setShowDatePicker(false);
    } catch (error) {
      toast.error("Failed to create event.");
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date && !eventDates.includes(date)) {
      setEventDates([...eventDates, date]);
    }
  };

  return (
    <div>
      <h1>Event List</h1>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {showDatePicker ? "Hide Date Picker" : "Show Date Picker"}
        </button>
        {showDatePicker && (
          <div className="date-picker-overlay">
            <DatePicker
              className="custom-datepicker"
              selected={null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Dates"
              inline
            />
          </div>
        )}
        <ul>
          {eventDates.map((date) => (
            <li key={date.toString()}>{date.toISOString().split("T")[0]}</li>
          ))}
        </ul>
        <button type="submit">Add Event</button>
      </form>

      <ol>
        <h2>Events: </h2>

        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/event/${event.uniqueId}`}>{event.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EventList;
