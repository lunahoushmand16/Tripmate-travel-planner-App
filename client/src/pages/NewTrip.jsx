import React, { useState, useEffect } from 'react';
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
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const navigate = useNavigate();

  // ✅ Correct useEffect for fetching suggestions from GeoDB API
    useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${destination}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );

        const data = await response.json();
        setSuggestions(Array.isArray(data?.data) ? data.data : []); // ✅ safe fallback
      } catch (error) {
        console.error('❌ Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [destination]);

const [addTrip] = useMutation(ADD_TRIP, {
  refetchQueries: ['Me'], // or your actual profile query name
});

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addTrip({
      variables: {
        title: tripName,
        startDate,
        endDate,
        destinations: [
          {
            name: selectedDestination || destination,
            location: selectedDestination || destination,
            arrivalDate: startDate,
            departureDate: endDate,
            activities: [],
          },
        ],
        notes: '',
      },
    });
    // Optionally, await refetch();
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
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Start typing a city..."
            required
          />
          {/* ✅ Dropdown rendering suggestion list safely */}
          {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((city, index) => {
                const cityName = city?.city || city?.name || 'Unknown';
                const countryName = city?.country || 'Unknown';
                const fullName = `${cityName}, ${countryName}`;

                return (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedDestination(fullName);
                      setDestination(fullName);
                      setSuggestions([]);
                    }}
                  >
                    {fullName}
                  </li>
                );
              })}
            </ul>
          )}
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