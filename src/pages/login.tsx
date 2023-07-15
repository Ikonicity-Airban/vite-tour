import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Toast,
} from "flowbite-react";
import LogoComponent from "../components/LogoComponent";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { AppContext } from "../api/context";
import { useContext } from "react";
import { Types } from "../api/reducer";

import { LoadingButton } from "../components/Buttons";
interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async ({
    email: Email,
    password,
  }) => {
    try {
      setLoading(true);
      await auth.setPersistence(browserLocalPersistence);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        Email,
        password
      );

      const {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        metadata,
        photoURL,
        refreshToken,
      } = userCredentials.user;

      dispatch({
        type: Types.login,
        payload: {
          refreshToken,
          user: {
            displayName,
            email,
            emailVerified,
            metadata,
            phoneNumber,
            photoURL,
          },
        },
      });
      redirect("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setErrMsg(""), 5000);
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        metadata,
        photoURL,
        refreshToken,
      } = userCredential.user;

      dispatch({
        type: Types.login,
        payload: {
          refreshToken,
          user: {
            displayName,
            email,
            emailVerified,
            metadata,
            phoneNumber,
            photoURL,
          },
        },
      });
      redirect("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
      }
    } finally {
      setTimeout(() => setErrMsg(""), 5000);
      setLoading(false);
    }
  };
  //return
  return (
    <section className="grid place-items-center min-h-screen mt-10 mb-20">
      {errMsg && (
        <Toast className="fixed top-0 md:top-10 z-50 min-w-max">
          <p>{errMsg}</p>
          <Toast.Toggle></Toast.Toggle>
        </Toast>
      )}
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
              required
              type="password"
              {...register("password")}
              // placeholder="help"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember me
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
          {loading ? (
            <LoadingButton />
          ) : (
            <Button
              disabled={loading}
              gradientDuoTone={"greenToBlue"}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          )}
        </form>
        <button
          disabled={loading}
          className="w-full flex items-center space-x-3 justify-center rounded-lg p-3 text-sm my-4 border-[1px] border-slate-200"
          type="button"
          onClick={googleSignIn}
        >
          <span className="w-6 object-contain mr-2">
            <img src="google.svg" alt="logo" className="object-contain" />
          </span>
          Sign in with google
        </button>
      </Card>
    </section>
  );
}

export default LoginPage;
