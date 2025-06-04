// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { User } from '../models/User';
// import { TravelPlan } from '../models/TravelPlan';

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tripmate';

// async function seed() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('MongoDB connected!');

//     // Clear existing data
//     await User.deleteMany({});
//     await TravelPlan.deleteMany({});

//     // Create users
//     const users = await User.insertMany([
//       {
//         username: 'alice',
//         email: 'alice@example.com',
//         password: 'password123', // Make sure your model hashes passwords if needed
//       },
//       {
//         username: 'bob',
//         email: 'bob@example.com',
//         password: 'password123',
//       },
//     ]);

//     // Create travel plans
//     const plans = await TravelPlan.insertMany([
//       {
//         title: 'Trip to Paris',
//         startDate: '2024-07-01',
//         endDate: '2024-07-10',
//         destinations: [
//           {
//             city: 'Paris',
//             country: 'France',
//           },
//         ],
//         notes: 'Eiffel Tower, Louvre, croissants!',
//         userId: users[0]._id,
//       },
//       {
//         title: 'Japan Adventure',
//         startDate: '2024-08-15',
//         endDate: '2024-08-25',
//         destinations: [
//           {
//             city: 'Tokyo',
//             country: 'Japan',
//           },
//           {
//             city: 'Kyoto',
//             country: 'Japan',
//           },
//         ],
//         notes: 'Sushi, temples, cherry blossoms.',
//         userId: users[1]._id,
//       },
//     ]);

//     console.log('Seed data created!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Seed error:', err);
//     process.exit(1);
//   }
// }

// seed();