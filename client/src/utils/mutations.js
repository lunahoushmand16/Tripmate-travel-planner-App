import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation AddTrip(
    $title: String!
    $startDate: String!
    $endDate: String!
    $destinations: [DestinationInput]
    $notes: String
  ) {
    addTravelPlan(
      title: $title
      startDate: $startDate
      endDate: $endDate
      destinations: $destinations
      notes: $notes
    ) {
      _id
      title
      startDate
      endDate
      notes
      destinations {
        name
        location
        arrivalDate
        departureDate
        activities
        __typename   # ✅ add this
      }
      __typename     # ✅ and this
    }
  }
`;

export const DELETE_TRAVEL_PLAN = gql`
  mutation DeleteTravelPlan($id: ID!) {
    deleteTravelPlan(id: $id) {
      _id
    }
  }
`;

export const UPDATE_TRAVEL_PLAN = gql`
  mutation UpdateTravelPlan(
    $id: ID!
    $title: String
    $startDate: String
    $endDate: String
    $notes: String
    $destinations: [DestinationInput]
  ) {
    updateTravelPlan(
      id: $id
      title: $title
      startDate: $startDate
      endDate: $endDate
      notes: $notes
      destinations: $destinations
    ) {
      _id
      title
      startDate
      endDate
      notes
      destinations {
        name
        location
        arrivalDate
        departureDate
        activities
      }
    }
  }
`;