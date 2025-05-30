import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRIP } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import './NewTrip.css';

const NewTrip = () => {
  console.log("✅ NewTrip page is rendering");

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const [addTrip] = useMutation(ADD_TRIP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    try {
      await addTrip({
        variables: {
          title: tripName,
          startDate,
          endDate,
          destinations: [
            {
              name: destination,
              location: destination,
              arrivalDate: startDate,
              departureDate: endDate,
              activities: [],
            },
          ],
          notes: '',
        },
      });

      navigate('/profile');
    } catch (err) {
      console.error('Error creating trip:', err);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="new-trip-page">
      <h2>Create New Trip</h2>
      <form className="trip-form" onSubmit={handleSubmit}>
        <label>
          Trip Name:
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            required
          />
        </label>

        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>

        <div className="date-inputs">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Create Trip</button>
        </div>
      </form>
    </div>
  );
};

export default NewTrip;
  