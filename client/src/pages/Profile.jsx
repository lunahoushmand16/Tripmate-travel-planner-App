import React, { useState } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const user = {
    username: 'NinaWood',
    email: 'wnicolenina@gmail.com',
    itinerary: [
      {
        destination: 'Greece',
        image: '/Greece.jpg',
        description: 'Explore ancient ruins in Athens, enjoy Santorini sunsets, and savor Mediterranean cuisine.',
        details: [
          { day: 'Day 1 – July 14, 2025', time: '9:00 AM', activity: 'Breakfast in Athens' },
          { day: 'Day 1 – July 14, 2025', time: '11:00 AM', activity: 'Acropolis tour' },
          { day: 'Day 1 – July 14, 2025', time: '6:00 PM', activity: 'Santorini sunset dinner' },
        ]
      },
      {
        destination: 'Paris',
        image: '/paris.jpg',
        description: 'Visit the Eiffel Tower, stroll the Seine, and explore iconic art at the Louvre.',
        details: [
          { day: 'Day 2 – September 3, 2025', time: '10:00 AM', activity: 'Eiffel Tower visit' },
          { day: 'Day 2 – September 3, 2025', time: '1:00 PM', activity: 'Lunch by the Seine' },
          { day: 'Day 2 – September 3, 2025', time: '4:00 PM', activity: 'Explore the Louvre' },
        ]
      },
      {
        destination: 'Thailand',
        image: '/Thailand.jpg',
        description: 'Island hop in Krabi, explore Bangkok temples, and dive into spicy street food culture.',
        details: [
          { day: 'Day 3 – February 22, 2026', time: '8:00 AM', activity: 'Island hopping in Krabi' },
          { day: 'Day 3 – February 22, 2026', time: '12:00 PM', activity: 'Bangkok street food tour' },
          { day: 'Day 3 – February 22, 2026', time: '5:00 PM', activity: 'Wat Arun temple tour' },
        ]
      }
    ]
  };

  return (
    <div className="profile">
      <Navbar />

      <h1 className="page-title">Welcome, {user.username}</h1>
      <p className="email">{user.email}</p>

      <div className="itinerary-section">
        <h2>Your Itinerary</h2>
        <div className="trip-cards">
          {user.itinerary.map((trip, index) => (
            <div key={index} className="trip-card">
              <img src={trip.image} alt={trip.destination} className="trip-image" />
              <h3>{trip.destination}</h3>
              <p>{trip.description}</p>
              <button className="view-btn" onClick={() => setSelectedTrip(trip)}>
                View Trip
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedTrip && (
        <div className="modal-overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal-content animate" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedTrip(null)}>×</button>
            <img src={selectedTrip.image} alt={selectedTrip.destination} className="modal-image" />
            <h2>{selectedTrip.destination}</h2>
            <p>{selectedTrip.description}</p>
            <ul className="trip-details-list">
              {selectedTrip.details.map((item, i) => (
                <li key={i}>
                  <strong>{item.day}</strong><br />
                  <span>{item.time} – {item.activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 TripMate. All rights reserved.</p>
        <div className="footer-icons">
          <a
            href="https://github.com/lunahoushmand16/Tripmate-travel-planner-App"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Profile;