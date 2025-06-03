import { User } from '../models/User';
import { TravelPlan } from '../models/TravelPlan';
import { signToken } from '../utils/auth';
import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';

// GraphQL resolvers for queries and mutations
export const resolvers: IResolvers = {
  Query: {
    // Get current user info
    me: async (_parent, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new Error('Not authenticated');
    },
    // Get a travel plan by ID
    getMyTravelPlans: async (_parent, _args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.find({ userId: context.user._id });
    },
    getTravelPlan: async (_parent, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOne({ _id: id, userId: context.user._id });
    },
    // Get weather info for a city
    getWeather: async (_parent, { city }) => {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      const weather = response.data;

      return {
        temperature: weather.main.temp,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon
      };
    },
    // Get Google Maps embed URL for a place
    getGoogleMapEmbedUrl: async (_parent, { place }) => {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const baseUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(place)}`;
      return baseUrl;
    }
  },
  Mutation: {
    // Register a new user
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // Login user and return JWT
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    // Add a new travel plan
    addTravelPlan: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.create({ ...args, userId: context.user._id });
    },
    // Update an existing travel plan
    updateTravelPlan: async (_parent, { id, ...rest }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOneAndUpdate({ _id: id, userId: context.user._id }, rest, { new: true });
    },
    // Delete a travel plan
    deleteTravelPlan: async (_parent, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOneAndDelete({ _id: id, userId: context.user._id });
    }
  }
};
