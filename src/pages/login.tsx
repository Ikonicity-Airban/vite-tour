import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FaEnvelope, FaKey } from "react-icons/fa6";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { IUser } from "../api/@types";
import { LogoComponent } from "../components";
import { defaultUser } from "../api/contexts/reducer";
import getTokenUser from "../api/getTokenUser";
import toast from "react-hot-toast";
import useLocalStorage from "../api/hooks/useLocalStorage";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [user, setUser] = useLocalStorage<IUser>("tour-user", defaultUser);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      setLoading(true);
      await auth.setPersistence(browserLocalPersistence);
      const { user: newUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser({ ...user, ...newUser, email });
      const usersRef = doc(db, "users", newUser?.uid || user?.uid || "");

      await setDoc(
        usersRef,
        { lastLoggedIn: new Date(Date.now()).toUTCString() },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errMsg = error.message;
        toast.error(
          errMsg === "Firebase: Error (auth/user-not-found)."
            ? "Account doesn't exist, please sign up now"
            : errMsg === "Firebase: Error (auth/network-request-failed)."
            ? "Poor Network Connection"
            : "Something went wrong, Try again"
        );
        console.log(
          "🚀 ~ file: login.tsx:55 ~ constonSubmit:SubmitHandler<IFormInput>= ~ errMsg:",
          errMsg
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const usersRef = doc(db, "users", user.uid);

      // Use setDoc() with merge option to avoid overwriting existing data
      await setDoc(usersRef, getTokenUser(user), { merge: true });
      setUser(getTokenUser(user));
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      }
    }
  };

  //return
  return (
    <section className="grid place-items-center min-h-screen mt-10 mb-20">
      <Card className="smallScreens:min-w-[320px] w-5/6 max-w-md mt-10">
        <div className="mx-auto mb-10">
          <LogoComponent />
        </div>
        <span className="flex place-content-center">
          <h3 className="text-primary max-w-md">Login</h3>
        </span>

        <form autoFocus onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              autoFocus
              icon={FaEnvelope}
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="email"
              {...register("email")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>

            <TextInput
              id="password1"
              icon={FaKey}
              required
              type={showPass ? "password" : "text"}
              {...register("password")}
              // placeholder="help"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="showPass" onChange={() => setShowPass(!showPass)} />
            <Label htmlFor="showPass" className="cursor-pointer">
              Show Password
            </Label>
          </div>
          <div className="flex items-center gap-2 text-xs">
            Don't have an account?
            <Link
              to="/create-account"
              className="text-xs underline dark:bg-transparent bg-slate-100 p-1"
            >
              Sign up
            </Link>
          </div>

          <Button
            disabled={loading}
            isProcessing={loading}
            gradientDuoTone={"greenToBlue"}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Button
          color="royalblue"
          disabled={loading}
          className="w-full flex items-center space-x-3 justify-center rounded-lg text-sm my-4 border-[1px] border-slate-200"
          type="button"
          onClick={googleSignIn}
        >
          <span className="w-6 object-contain mr-2">
            <img src="google.svg" alt="logo" className="object-contain" />
          </span>
          Sign in with google
        </Button>
      </Card>
    </section>
  );
}

export default LoginPage;
