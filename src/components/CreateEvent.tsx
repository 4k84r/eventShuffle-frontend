import React, { useState } from 'react';
import { createEvent } from '../api/eventAPI';

const CreateEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [dates, setDates] = useState<string[]>(['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(name, dates);
    setName('');
    setDates(['']);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const addDateField = () => {
    setDates([...dates, '']);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        {dates.map((date, index) => (
          <div key={index}>
            <label>Date {index + 1}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addDateField}>Add Date</button>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
