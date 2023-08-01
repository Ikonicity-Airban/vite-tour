import {
  Alert,
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import { BreadcrumbComponents, Section } from "../components";
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

import { AppContext } from "../api/context";
import { IUser } from "../api/@types";
import LogoComponent from "../components/LogoComponent";
import { Types } from "../api/reducer";
import { saveToFirestore } from "../api/fetchCollections";
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
  const [errMsg, setErrMsg] = useState("");
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
      setErrMsg("Password doesn't Match");
      return;
    }
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        Email,
        password
      );

      await updateProfile(user, { displayName: name });

      await saveToFirestore<IUser & { role: string }>("users", {
        displayName: user.displayName,
        email: user.email ?? "",
        bookings: [],
        role: "user",
        plan: null,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
      });

      dispatch({
        type: Types.login,
        payload: {
          ...user,
        },
      });

      //navigate to login
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
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

      const usersRef = doc(db, "users", user.uid);

      const userData = {
        displayName: user.displayName,
        email: user.email,
        bookings: [],
        role: "user",
        plan: null,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
      };

      // Use setDoc() with merge option to avoid overwriting existing data
      await setDoc(usersRef, userData, { merge: true });
      dispatch({
        type: Types.login,
        payload: {
          ...user,
        },
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
      setLoading(false);
    }
  };

  return (
    <main className="my-10 md:mt-20">
      <BreadcrumbComponents />
      <section className="grid place-items-center min-h-screen">
        <Section subtitle="Create an account" title="sign up form">
          {errMsg && (
            <Alert color="failure">
              <span>
                <p>
                  <span className="font-medium">Info alert!</span>
                  {errMsg}
                </p>
              </span>
            </Alert>
          )}

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
                  login
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
              outline
              isProcessing={loading}
              disabled={loading}
              className="w-full flex items-center space-x-3 justify-center rounded-lg text-sm my-4 border-[1px] border-slate-200"
              type="button"
              onClick={googleSignIn}
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
