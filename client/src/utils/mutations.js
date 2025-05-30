import { gql } from '@apollo/client';

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
    }
  }
`;