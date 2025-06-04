import { gql } from 'apollo-server-express';
// GraphQL schema definitions for queries and mutations
export const typeDefs = gql`
  type User {
  _id: ID!
  username: String!
  email: String!
  travelPlans: [TravelPlan] 
}

  type Destination {
    name: String!
    location: String!
    arrivalDate: String!
    departureDate: String!
    activities: [String]
  }

  type TravelPlan {
    _id: ID!
    userId: ID!
    title: String!
    startDate: String!
    endDate: String!
    destinations: [Destination]
    notes: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Weather {
    temperature: Float
    description: String
    icon: String
  }

  input DestinationInput {
    name: String!
    location: String!
    arrivalDate: String!
    departureDate: String!
    activities: [String]
  }

  type Query {
    me: User
    getMyTravelPlans: [TravelPlan]
    getTravelPlan(id: ID!): TravelPlan
    getWeather(city: String!): Weather
    getGoogleMapEmbedUrl(place: String!): String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTravelPlan(title: String!, startDate: String!, endDate: String!, destinations: [DestinationInput], notes: String): TravelPlan
    updateTravelPlan(id: ID!, title: String, startDate: String, endDate: String, destinations: [DestinationInput], notes: String): TravelPlan
    deleteTravelPlan(id: ID!): TravelPlan
  }
`;