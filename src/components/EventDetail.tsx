import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, addVotes } from "../apiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfDay } from "date-fns";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [voteName, setVoteName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [votes, setVotes] = useState<string[]>([]);
  const [nameError, setNameError] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const eventData = await getEventById(id);
          if (!eventData) {
            throw new Error("Event not found");
          }
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        navigate("/404");
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleAddVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (/\d/.test(voteName)) {
      setNameError("Name cannot contain numbers.");
      return;
    } else {
      setNameError("");
    }

    if (event && id && voteName && votes.length > 0) {
      await addVotes(id, voteName, votes);
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
      setVoteName("");
      setVotes([]);
      setSelectedDate(null);
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(startOfDay(date), "yyyy-MM-dd");
      setVotes([...votes, formattedDate]);
      setSelectedDate(null);
    }
  };

  return (
    <div
      style={{
        minWidth: "45%",
        maxWidth: "80%",
        margin: "0 auto",
        padding: "4% 20px 20px 20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {event ? (
        <>
          <h2 style={{ color: "#007bff" }}>
            Event Name: <u>{event?.name}</u>
          </h2>
          <h2 style={{ color: "#007bff" }}>Available Dates:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {event?.dates.map((date: string) => (
              <li key={date} style={{ padding: "5px 0" }}>
                {date}
              </li>
            ))}
          </ul>
          <h2 style={{ color: "#007bff" }}>Current Votes:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {event?.votes.map((vote: any) => (
              <li key={vote.date} style={{ padding: "5px 0" }}>
                {vote.date}: {vote.people.join(", ")}
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddVote} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="voteName"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Your Name:
              </label>
              <input
                id="voteName"
                type="text"
                value={voteName}
                onChange={(e) => setVoteName(e.target.value)}
                placeholder="Enter your name"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              {nameError && (
                <p style={{ color: "red", marginTop: "5px" }}>{nameError}</p>
              )}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="voteDate"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Select Date(s):
              </label>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {showDatePicker ? "Hide Date Picker" : "Show Date Picker"}
              </button>
              {showDatePicker && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                  }}
                >
                  <DatePicker
                    id="voteDate"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    inline
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Vote
            </button>
          </form>
          <h3 style={{ color: "#007bff" }}>Selected Dates:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {votes.map((vote, index) => (
              <li key={index} style={{ padding: "5px 0" }}>
                {vote}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "block",
              margin: "20px auto",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventDetail;
