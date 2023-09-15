import { IUser } from "./@types";

export default function getTokenUser(user: IUser) {
  const userData: IUser = {
    displayName: user.displayName,
    email: user.email ?? "",
    uid: user?.uid,
    role: "user",
    photoURL: user?.photoURL,
    phoneNumber: user?.phoneNumber,
    lastLoggedIn: new Date(Date.now()).toUTCString(),
  };

  return userData;
}
