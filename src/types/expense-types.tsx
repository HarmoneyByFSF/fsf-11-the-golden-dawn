import { EventFrequency } from './event-frequency';

interface HousingExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  housingPoints: number;
}

interface TransportationExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  transportationPoints: number;
}

interface HealthExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  healthPoints: number;
}

interface FoodExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  foodPoints: number;
}

interface PersonalCareExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  personalCarePoints: number;
}

interface EntertainmentExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  entertainmentPoints: number;
}

interface HousingExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  housingPoints: number;
  happinessPoints: number;
}

interface TransportationExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  transportationPoints: number;
  happinessPoints: number;
}

interface HealthExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  healthPoints: number;
  happinessPoints: number;
}

interface FoodExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  foodPoints: number;
  happinessPoints: number;
}

interface PersonalCareExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  personalCarePoints: number;
  happinessPoints: number;
}

interface EntertainmentExpense {
  name: string;
  amount: number;
  frequency: EventFrequency | null;
  entertainmentPoints: number;
  happinessPoints: number;
}

export type { FoodExpense, HealthExpense, EntertainmentExpense, TransportationExpense, HousingExpense, PersonalCareExpense}