import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import LogoComponent from "../components/LogoComponent";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { AppContext } from "../api/context";
import { useContext } from "react";
import { Types } from "../api/reducer";

interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

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
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
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
      navigate("/dashboard", {
        state: userCredential,
        replace: true,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  //return
  return (
    <section className="grid place-items-center min-h-screen py-10">
      <Card className="smallScreens:min-w-[320px] ">
        <div className="mx-auto mb-10">
          <LogoComponent />
        </div>
        <span className="flex place-content-center">
          <h3 className="text-primary max-w-md">Login Form</h3>
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Link to="/create-account" className="">
              click here
            </Link>
          </div>
          <Button
            disabled={loading}
            gradientDuoTone={"purpleToBlue"}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Button
          disabled={loading}
          className="w-full"
          type="button"
          onClick={googleSignIn}
        >
          Sign in with google
        </Button>
      </Card>
    </section>
  );
}

export default LoginPage;