import { User } from '../models/User';
import { TravelPlan } from '../models/TravelPlan';
import { signToken } from '../utils/auth';
import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';

export const resolvers: IResolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new Error('Not authenticated');
    },
    getMyTravelPlans: async (_parent, _args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.find({ userId: context.user._id });
    },
    getTravelPlan: async (_parent, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOne({ _id: id, userId: context.user._id });
    },
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
    getGoogleMapEmbedUrl: async (_parent, { place }) => {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const baseUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(place)}`;
      return baseUrl;
    }
  },
  Mutation: {
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addTravelPlan: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.create({ ...args, userId: context.user._id });
    },
    updateTravelPlan: async (_parent, { id, ...rest }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOneAndUpdate({ _id: id, userId: context.user._id }, rest, { new: true });
    },
    deleteTravelPlan: async (_parent, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return TravelPlan.findOneAndDelete({ _id: id, userId: context.user._id });
    }
  }
};
