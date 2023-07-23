import {
  Alert,
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { AppContext } from "../api/context";
import LogoComponent from "../components/LogoComponent";
import { Types } from "../api/reducer";
import { auth } from "../firebase";

interface IFormInput {
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

  //sign-up function
  const onSubmit: SubmitHandler<IFormInput> = async ({
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
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        Email,
        password
      );

      userCredentials.user;

      dispatch({
        type: Types.login,
        payload: {
          ...userCredentials.user,
        },
      });
      navigate("/dashboard", {
        state: userCredentials,
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      dispatch({
        type: Types.login,
        payload: {
          ...userCredential.user,
        },
      });
      navigate("/dashboard", {
        state: JSON.stringify(userCredential),
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrMsg(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid place-items-center min-h-screen py-32">
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
      <Card className="smallScreens:min-w-[320px] w-5/6 max-w-md mt-20">
        <div className="mx-auto mb-10">
          <LogoComponent />
        </div>
        <span className="flex place-content-center">
          <h3 className="text-primary max-w-md">Create Account</h3>
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              autoFocus
              id="email1"
              placeholder="john@doe.com"
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
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword1" value="Confirm Password" />
            </div>
            <TextInput
              id="password2"
              required
              type="password"
              {...register("confirmPassword")}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember me
            </Label>
          </div>
          <div className="flex items-center gap-2 text-xs">
            already have an account?
            <NavLink to="/login" className="text-xs underline bg-slate-100 p-1">
              login
            </NavLink>
          </div>
          <Button
            disabled={loading}
            gradientDuoTone={"greenToBlue"}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
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
          Sign up with google
        </button>
      </Card>
    </section>
  );
}

export default SignUpPage;
