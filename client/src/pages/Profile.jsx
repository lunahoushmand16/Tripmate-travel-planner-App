import React, { useState } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  // Add useQuery(GET_ME) to get real logged-in user
  // Build your user object from live data
  const { loading, data } = useQuery(GET_ME);

  if (loading) return <p>Loading profile...</p>;
  if (!data?.me) return <p>Not authenticated</p>;

  const user = {
    username: data.me.username,
    email: data.me.email,
    profileImage: '/keelin-profile.jpg',
    itinerary: [
      {
        destination: 'Greece',
        image: '/Greece.jpg',
        description: 'Explore ancient ruins in Athens, enjoy Santorini sunsets, and savor Mediterranean cuisine.',
        date: 'May 18–25, 2025',
        schedule: [
          { time: '10:00 AM', activity: 'Visit Acropolis' },
          { time: '1:00 PM', activity: 'Lunch in Plaka' },
          { time: '3:00 PM', activity: 'Sunset at Oia' },
        ],
      },
      {
        destination: 'Paris',
        image: '/paris.jpg',
        description: 'Visit the Eiffel Tower, stroll the Seine, and explore iconic art at the Louvre.',
        date: 'August 2–10, 2025',
        schedule: [
          { time: '9:00 AM', activity: 'Eiffel Tower Tour' },
          { time: '12:00 PM', activity: 'Lunch by the Seine' },
          { time: '3:00 PM', activity: 'Louvre Museum' },
        ],
      },
      {
        destination: 'Thailand',
        image: '/Thailand.jpg',
        description: 'Island hop in Krabi, explore Bangkok temples, and dive into spicy street food culture.',
        date: 'March 12–20, 2026',
        schedule: [
          { time: '10:00 AM', activity: 'Island hopping in Krabi' },
          { time: '1:00 PM', activity: 'Street food tour' },
          { time: '4:00 PM', activity: 'Temple exploration' },
        ],
      },
    ],
  };

  return (
    <div className="profile">
      <Navbar />

      {/* Profile Image */}
      <div className="profile-container">
        <div className="profile-image-container">
          <img src={user.profileImage} alt="Profile" className="profile-image" />
        </div>
      </div>

      <h1 className="page-title">Welcome, {user.username}</h1>
      <p className="email">{user.email}</p>

      <div className="itinerary-section">
        <h2>Your Itinerary</h2>
        <div className="trip-cards">
          {user.itinerary.map((trip, index) => (
            <div key={index} className="trip-card">
              <img src={trip.image} alt={trip.destination} className="trip-image" />
              <h3>{trip.destination}</h3>
              <p className="trip-date">{trip.date}</p>
              <p>{trip.description}</p>
              <button className="view-btn" onClick={() => setSelectedTrip(trip)}>View Trip</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTrip && (
        <div className="modal-overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedTrip(null)}>×</button>
            <img src={selectedTrip.image} alt={selectedTrip.destination} className="modal-image" />
            <h2>{selectedTrip.destination}</h2>
            <p className="trip-date">{selectedTrip.date}</p>
            <p>{selectedTrip.description}</p>
            <ul className="trip-details-list">
              {selectedTrip.schedule.map((item, index) => (
                <li key={index}>
                  <span className="time">{item.time}</span> – {item.activity}
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