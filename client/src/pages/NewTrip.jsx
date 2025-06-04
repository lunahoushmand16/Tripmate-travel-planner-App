import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRIP } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import './NewTrip.css';

const emptyDestination = {
  name: '',
  location: '',
  arrivalDate: '',
  departureDate: '',
  activities: [''],
};

const NewTrip = () => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [destinations, setDestinations] = useState([{ ...emptyDestination }]);
  const [suggestions, setSuggestions] = useState([]);
  const [destinationInput, setDestinationInput] = useState('');
  const [selectedDestIdx, setSelectedDestIdx] = useState(null);
  const navigate = useNavigate();

  // Fetch city suggestions for the currently edited destination
  useEffect(() => {
    if (selectedDestIdx === null) return;
    const dest = destinations[selectedDestIdx];
    if (!dest || dest.name.length < 2) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${dest.name}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        const data = await response.json();
        setSuggestions(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [destinations, selectedDestIdx]);

  const [addTrip] = useMutation(ADD_TRIP, {
    refetchQueries: ['Me'],
  });

  // Handle destination field changes
  const handleDestinationChange = (idx, field, value) => {
    const updated = [...destinations];
    updated[idx][field] = value;
    setDestinations(updated);
    setSelectedDestIdx(idx);
  };

  // Handle activities changes
  const handleActivityChange = (destIdx, actIdx, value) => {
    const updated = [...destinations];
    updated[destIdx].activities[actIdx] = value;
    setDestinations(updated);
  };

  // Add/remove destinations
  const addDestination = () => setDestinations([...destinations, { ...emptyDestination }]);
  const removeDestination = (idx) => setDestinations(destinations.filter((_, i) => i !== idx));

  // Add/remove activities
  const addActivity = (destIdx) => {
    const updated = [...destinations];
    updated[destIdx].activities.push('');
    setDestinations(updated);
  };
  const removeActivity = (destIdx, actIdx) => {
    const updated = [...destinations];
    updated[destIdx].activities = updated[destIdx].activities.filter((_, i) => i !== actIdx);
    setDestinations(updated);
  };

  const handleSuggestionClick = (destIdx, city) => {
    const cityName = city?.city || city?.name || '';
    const countryName = city?.country || '';
    const updated = [...destinations];
    updated[destIdx].name = cityName;
    updated[destIdx].location = countryName;
    setDestinations(updated);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrip({
        variables: {
          title: tripName,
          startDate,
          endDate,
          notes,
          destinations: destinations.map(dest => ({
            ...dest,
            activities: dest.activities.filter(a => a.trim() !== ''),
          })),
        },
      });
      navigate('/profile');
    } catch (err) {
      console.error('❌ Error creating trip:', err);
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
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes about your trip"
          />
        </label>

        <h3>Destinations</h3>
        {destinations.map((dest, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
            <label>
              City (name):
              <input
                type="text"
                value={dest.name}
                onChange={e => handleDestinationChange(idx, 'name', e.target.value)}
                onFocus={() => setSelectedDestIdx(idx)}
                required
              />
              {selectedDestIdx === idx && suggestions.length > 0 && (
                <ul className="autocomplete-suggestions">
                  {suggestions.map((city, sidx) => {
                    const cityName = city?.city || city?.name || 'Unknown';
                    const countryName = city?.country || 'Unknown';
                    return (
                      <li
                        key={sidx}
                        onClick={() => handleSuggestionClick(idx, city)}
                      >
                        {cityName}, {countryName}
                      </li>
                    );
                  })}
                </ul>
              )}
            </label>
            <label>
              Country (location):
              <input
                type="text"
                value={dest.location}
                onChange={e => handleDestinationChange(idx, 'location', e.target.value)}
                required
              />
            </label>
            <label>
              Arrival Date:
              <input
                type="date"
                value={dest.arrivalDate}
                onChange={e => handleDestinationChange(idx, 'arrivalDate', e.target.value)}
                required
              />
            </label>
            <label>
              Departure Date:
              <input
                type="date"
                value={dest.departureDate}
                onChange={e => handleDestinationChange(idx, 'departureDate', e.target.value)}
                required
              />
            </label>
            <div>
              <strong>Activities:</strong>
              {dest.activities.map((act, actIdx) => (
                <div key={actIdx}>
                  <input
                    value={act}
                    onChange={e => handleActivityChange(idx, actIdx, e.target.value)}
                    placeholder="Activity"
                  />
                  <button type="button" onClick={() => removeActivity(idx, actIdx)} disabled={dest.activities.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addActivity(idx)}>Add Activity</button>
            </div>
            <button type="button" onClick={() => removeDestination(idx)} disabled={destinations.length === 1}>Remove Destination</button>
          </div>
        ))}
        <button type="button" onClick={addDestination}>Add Destination</button>
        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Create Trip</button>
        </div>
      </form>
    </div>
  );
};

export default NewTrip;