import { DocumentData } from "firebase/firestore";

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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
export interface ILoginResponse {
  refreshToken: string;
  user: IUserResponse;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  bookings: Booking[];
  Plan: PackagePlan;
}

interface Booking {
  id: string;
  tourId: string;
  userId: string;
  date: Date;
  numGuests: number;
}
interface PackagePlan {
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
