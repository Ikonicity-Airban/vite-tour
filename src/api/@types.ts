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
    }
  | DocumentData;

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
}
export interface ILoginResponse {
  refreshToken: string;
  user: IUserResponse;
}
