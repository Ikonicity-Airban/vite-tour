import { BreadcrumbComponents, LogoComponent, Section } from "../components";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";

import { AppContext } from "../api/contexts/context";
import { Types } from "../api/contexts/reducer";
import getTokenUser from "../api/getTokenUser";
import { toast } from "react-hot-toast";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  auth.setPersistence(inMemoryPersistence);
  const [showPass, setShowPass] = useState(true);

  //sign-up function
  const onSubmit: SubmitHandler<IFormInput> = async ({
    name,
    email: Email,
    confirmPassword,
    password,
  }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't Match");
      return;
    }
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        Email,
        password
      );
      console.log("🚀 ~ file: signup.tsx:51 ~ SignUpPage ~ user:", user);
      await updateProfile(user, { displayName: name });

      const usersRef = doc(db, "users", user?.uid || "");

      // Use setDoc() with merge option to avoid overwriting existing data
      await setDoc(usersRef, getTokenUser(user), { merge: true });
      //navigate to login
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        const errMsg = error.message;
        console.log(errMsg);
        toast.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      //save the user to firestore

      const usersRef = doc(db, "users", user?.uid);
      // Use setDoc() with merge option to avoid overwriting existing data
      await setDoc(usersRef, getTokenUser(user), { merge: true });
      dispatch({
        type: Types.login,
        payload: {
          ...user,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="my-10 md:mt-20">
      <BreadcrumbComponents />
      <section className="grid place-items-center min-h-screen">
        <Section subtitle="Create an account" title="sign up form">
          <Card
            className="mobile:min-w-[320px] w-11/12 max-w-md mt-20 mx-auto p-0"
            id=""
          >
            <div className="mx-auto my-4">
              <LogoComponent />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput
                  autoFocus
                  id="name"
                  placeholder="john@doe.com"
                  required
                  {...register("name")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                  id="email1"
                  placeholder="john@doe.com"
                  required
                  type="email"
                  {...register("email")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  required
                  type={showPass ? "password" : "text"}
                  {...register("password")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPassword" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  required
                  type={showPass ? "password" : "text"}
                  {...register("confirmPassword")}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showPass"
                  onChange={() => setShowPass(!showPass)}
                />
                <Label htmlFor="showPass" className="cursor-pointer">
                  Show Password
                </Label>
              </div>
              <div className="flex items-center gap-2 text-xs">
                already have an account?
                <NavLink
                  to="/login"
                  className="text-xs underline dark:bg-slate-700 bg-slate-100 p-1"
                >
                  Login
                </NavLink>
              </div>
              <Button
                isProcessing={loading}
                disabled={loading}
                gradientDuoTone={"greenToBlue"}
                className="w-full"
                type="submit"
              >
                Submit
              </Button>
            </form>
            <Button
              disabled={loading}
              className="w-full flex items-center space-x-3 justify-center rounded-lg text-sm my-4 border-[1px] border-slate-200"
              type="button"
              onClick={googleSignIn}
              color="skyblue"
            >
              <span className="w-6 object-contain mr-2">
                <img src="google.svg" alt="logo" className="object-contain" />
              </span>
              Sign up with google
            </Button>
          </Card>
        </Section>
      </section>
    </main>
  );
}

export default SignUpPage;
