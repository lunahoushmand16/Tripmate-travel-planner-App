import React, { useState } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  // Add useQuery(GET_ME) to get real logged-in user
  //✅  Fetch logged-in user data, including their travel plans
  const { loading, data } = useQuery(GET_ME);

  if (loading) return <p>Loading profile...</p>;
  if (!data || !data.me) {
    return <p>Not authenticated</p>;
  }
  
  const user = data.me;
  const trips = user.travelPlans || [];
  
  if (trips.length === 0) {
    return (
      <div className="profile">
        <Navbar />
        <h1 className="page-title">Welcome, {user.username}</h1>
        <p className="email">{user.email}</p>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          You haven’t created any trips yet. Click <strong>New Trip</strong> to start planning!
        </p>
      </div>
    );
  }  

  // Commented all hardcoded for newTrip cards

  // const user = {
  //   username: data.me.username,
  //   email: data.me.email,
  //   profileImage: '/profile photo1.jpg',
  //   travelPlans: data.me.travelPlans || [], 
  //   itinerary: [
  //     {
  //       destination: 'Greece',
  //       image: '/Greece.jpg',
  //       description: 'Explore ancient ruins in Athens, enjoy Santorini sunsets, and savor Mediterranean cuisine.',
  //       date: 'May 18–25, 2025',
  //       schedule: [
  //         { time: '10:00 AM', activity: 'Visit Acropolis' },
  //         { time: '1:00 PM', activity: 'Lunch in Plaka' },
  //         { time: '3:00 PM', activity: 'Sunset at Oia' },
  //       ],
  //     },
  //     {
  //       destination: 'Paris',
  //       image: '/paris.jpg',
  //       description: 'Visit the Eiffel Tower, stroll the Seine, and explore iconic art at the Louvre.',
  //       date: 'August 2–10, 2025',
  //       schedule: [
  //         { time: '9:00 AM', activity: 'Eiffel Tower Tour' },
  //         { time: '12:00 PM', activity: 'Lunch by the Seine' },
  //         { time: '3:00 PM', activity: 'Louvre Museum' },
  //       ],
  //     },
  //     {
  //       destination: 'Thailand',
  //       image: '/Thailand.jpg',
  //       description: 'Island hop in Krabi, explore Bangkok temples, and dive into spicy street food culture.',
  //       date: 'March 12–20, 2026',
  //       schedule: [
  //         { time: '10:00 AM', activity: 'Island hopping in Krabi' },
  //         { time: '1:00 PM', activity: 'Street food tour' },
  //         { time: '4:00 PM', activity: 'Temple exploration' },
  //       ],
  //     },
  //   ],
  // };

  return (
    <div className="profile">
      <Navbar />

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