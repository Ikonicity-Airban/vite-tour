import { DocumentData } from "firebase/firestore";

type strNull = string | null;

export type IUser = {
  email?: strNull;
  uid?: strNull;
  role?: "user" | "admin";
  displayName?: strNull;
  photoURL?: strNull;
  phoneNumber?: strNull;
  plan?: IPlan["title"] | null;
  bookings?: IBooking[];
  emailVerified?: boolean;
  lastLoggedIn?: string;
  noOfTourLeft?: number;
};

export type IPayment = {
  userId: IUser["uid"];
  email: IUser["email"];
};

export interface ITourGuide {
  name: string;
  sex: "male" | "female";
  photoURL: string;
  location: string;
  about: string;
}
export interface IService {
  name: string;
  icon: string;
  desc: string;
}
export interface IGenericResponse {
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
      other?: { string: string }[];
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
export interface ITour {
  id: string;
  title: string;
  description: string;
  bookings: IBooking[];
  Plan: IPlan["title"];
}

export interface IBooking {
  place?: string;
  id?: string;
  tourId?: string;
  duration: string;
  userId: string;
  date: string;
  numGuests: string;
  email?: string;
  plan?: IPlan["title"] | null;
  status?: "declined" | "approved" | "idle";
  completed?: boolean;
}

export interface IPlan {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rate: string;
  days: number;
  color: string;
  person: number;
  noOfTours: number;
}
