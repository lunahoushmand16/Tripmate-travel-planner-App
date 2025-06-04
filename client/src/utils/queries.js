// client/src/utils/queries.js
import { gql } from '@apollo/client';

// ✅ Updated to include travelPlans and nested destination fields
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      travelPlans {
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
          __typename  # ✅ REQUIRED for Apollo cache
        }
        __typename  # ✅ REQUIRED
      }
      __typename
    }
  }
`;
