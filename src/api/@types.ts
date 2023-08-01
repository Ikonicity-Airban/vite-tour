import { DocumentData } from "firebase/firestore";

type strNull = string | null;

export type IUser = {
  email: string;
  uid?: strNull;
  displayName?: strNull;
  photoURL?: strNull;
  phone?: strNull;
  plan: Plan | null;
  bookings?: Booking[];
};

export interface IService {
  name: string;
  icon: string;
  desc: string;
}
export interface GenericResponse {
  status: string;
  message: string;
}

export type IPlaceResponse =
  | {
      about: string;
      images: string[];
      tags: string;
      id: string;
      name: string;
    }
  | DocumentData;

export type IPlace = {
  about: string;
  images: string[];
  tags: string;
  id: string;
  name: string;
  other?: undefined;
};
export interface IUserResponse {
  displayName?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  phoneNumber?: number | string | null;
  metadata?: {
    creationTime?: string | null | undefined;
    lastSignInTime?: string | null | undefined;
  } | null;
  photoURL?: string | null;
  uid: string;
}
export interface Tour {
  id: string;
  title: string;
  description: string;
  bookings: Booking[];
  Plan: PackagePlan;
}

export interface Booking {
  place: string;
  id: string;
  tourId: string;
  duration: string;
  userId: string;
  date: string;
  numGuests: string;
  plan?: Plan["title"] | null;
}
export interface PackagePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rate: string;
  days: number;
  color: string;
  person: number;
}
