import { DocumentData } from "firebase/firestore";

type strNull = string | null;

export type IUser = {
  email?: strNull;
  uid?: strNull;
  displayName?: strNull;
  photoURL?: strNull;
  phone?: strNull;
  plan?: Plan["title"] | null;
  bookings?: Booking[];
  emailVerified?: boolean;
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
      others?: { string: string }[];
    }
  | DocumentData;

export type IPlace = {
  about: string;
  images: string[];
  tags: string;
  id: string;
  name: string;
  other?: { unknown: string }[] | [];
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
  Plan: Plan["title"];
}

export interface Booking {
  place?: string;
  id?: string;
  tourId?: string;
  duration: string;
  userId: string;
  date: string;
  numGuests: string;
  plan?: Plan["title"] | null;
  status?: "declined" | "approved" | "idle";
  completed?: boolean;
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
