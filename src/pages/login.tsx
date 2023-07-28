import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Toast,
} from "flowbite-react";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { AppContext } from "../api/context";
import LogoComponent from "../components/LogoComponent";
import { Types } from "../api/reducer";
import { auth } from "../firebase";
import { useContext } from "react";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const [errMsg, setErrMsg] = useState("");
  const [showPass, setShowPass] = useState(true);

  const navigate = useNavigate();
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

      dispatch({
        type: Types.login,
        payload: {
          ...userCredentials.user,
        },
      });
      navigate("/dashboard");
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

      dispatch({
        type: Types.login,
        payload: {
          ...userCredential.user,
        },
      });
      navigate("/dashboard");
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
          outline
          color="success"
          disabled={loading}
          isProcessing={loading}
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
