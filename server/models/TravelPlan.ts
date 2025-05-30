import { Schema, model, Document } from 'mongoose';

interface IDestination {
  name: string;
  location: string;
  arrivalDate: string;
  departureDate: string;
  activities: string[];
}

interface ITravelPlan extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  startDate: string;
  endDate: string;
  destinations: IDestination[];
  notes?: string;
}

const destinationSchema = new Schema<IDestination>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  departureDate: { type: String, required: true },
  activities: [{ type: String }]
});

const travelPlanSchema = new Schema<ITravelPlan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  destinations: [destinationSchema],
  notes: String
});

export const TravelPlan = model<ITravelPlan>('TravelPlan', travelPlanSchema);