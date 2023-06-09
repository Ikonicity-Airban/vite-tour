import { IUser } from "./@types";

export default function getTokenUser(user: IUser) {
  return {
    user,
  };
}
