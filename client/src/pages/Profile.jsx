import React, { useState, useEffect } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const navigate = useNavigate();
  
  // Add useQuery(GET_ME) to get real logged-in user
  //✅  Fetch logged-in user data, including their travel plans
  const { loading, data } = useQuery(GET_ME);

  useEffect(() => {
    if (!loading && !data?.me) {
      navigate('/'); // ✅ redirect to homepage if not logged in
    }
  }, [loading, data]);

  if (loading) return <p>Loading profile...</p>;
  if (!data?.me) return null; // ✅ safely return nothing, we already redirected
  
  const user = data.me;
  const trips = user.travelPlans || [];
  
  if (trips.length === 0) {
    return (
      <div className="profile">
        <Navbar />
        <div className="profile-avatar-circle">
          <span>{user.username.charAt(0).toUpperCase()}</span>
        </div>
        <h1 className="page-title">Welcome, {user.username}</h1>
        <p className="email">{user.email}</p>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          You haven’t created any trips yet. Click <strong>New Trip</strong> to start planning!
        </p>
      </div>
    );
  } 

  return (
    <div className="profile">
      <Navbar />

      {/* Profile picture /> */}
      <div className="profile-avatar-circle">
         <span>{user.username.charAt(0).toUpperCase()}</span>
      </div>

      <h1 className="page-title">Welcome, {user.username}</h1>
      <p className="email">{user.email}</p>

      <div className="itinerary-section">
      {/* <h2 className="itinerary-heading">YOUR ITINERARY</h2> */}
      <h2 style={{ textTransform: 'uppercase' }}>Your Itinerary</h2>
        <div className="trip-cards">
          {trips.length > 0 ? (
            trips.map((trip, index) => (
              <div key={index} className="trip-card">
                {/* <img src="/default-trip.jpg" alt="Trip Preview" className="trip-image" /> */}
                <img
                 src={`/default-trip-${index % 7 + 1}.jpg`}
                 alt="Trip Preview"
                 className="trip-image"
                 onError={(e) => {
                 e.target.onerror = null;
                 e.target.src = '/default-trip-fallback.jpg';
                 }}
                />
                <h3 style={{ marginTop: '0.5rem' }}>{trip.title}</h3>
                <p className="trip-date">{trip.startDate} – {trip.endDate}</p>
                <p>{trip.notes}</p>
                <button className="view-btn" onClick={() => setSelectedTrip(trip)}>View Trip</button>
              </div>
            ))
          ) : (
            <p>No trips found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedTrip && (
     <div className="modal-overlay" onClick={() => setSelectedTrip(null)}>
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
         <button className="close-btn" onClick={() => setSelectedTrip(null)}>×</button>

         {/* ✅ Dynamic image logic based on index */}
         <img
         src={`/default-trip-${trips.indexOf(selectedTrip) % 7 + 1}.jpg`}
         alt={selectedTrip.title}
         className="modal-image"
        onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/default-trip-fallback.jpg';
        }}
        />

       <h2>{selectedTrip.title}</h2>
       <p className="trip-date">{selectedTrip.startDate} – {selectedTrip.endDate}</p>
       <p>{selectedTrip.notes}</p>

       {/* ✅ Show details of destinations and activities */}
       {selectedTrip.destinations?.map((dest, idx) => (
        <div key={idx}>
          <h4>{dest.name}, {dest.location}</h4>
          <p>{dest.arrivalDate} – {dest.departureDate}</p>
          <ul className="trip-details-list">
            {dest.activities?.map((activity, aIdx) => (
              <li key={aIdx}>– {activity}</li>
            ))}
          </ul>
        </div>
       ))}
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