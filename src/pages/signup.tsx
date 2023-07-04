import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LogoComponent from "../components/LogoComponent";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../api/context";
import { Types } from "../api/reducer";

interface IFormInput {
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

  //sign-up function
  const onSubmit: SubmitHandler<IFormInput> = async ({
    email: Email,
    confirmPassword,
    password,
  }) => {
    if (password !== confirmPassword) {
      alert("Password doesn't Match");
      return;
    }
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
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
        state: userCredentials,
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
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
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid place-items-center min-h-screen py-32">
      <Card className="smallScreens:min-w-[320px] ">
        <div className="mx-auto mb-10">
          <LogoComponent />
        </div>
        <span className="flex place-content-center">
          <h3 className="text-primary max-w-md">Sign Up</h3>
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
            gradientDuoTone={"purpleToBlue"}
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
            <img src="vite.svg" alt="logo" className="object-contain" />
          </span>
          Sign up with google
        </button>
      </Card>
    </section>
  );
}

export default SignUpPage;
