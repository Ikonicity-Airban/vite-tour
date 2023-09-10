import { Card, Toast } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import LogoComponent from "../../components/LogoComponent";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      if (
        user.email == "ikonicityairban@gmail.com" ||
        user.email == "sylva.iyke.si@gmail.com"
      )
        navigate("/admin");
      else {
        user.delete();
        throw new Error("You are not authorized");
      }
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
    <section className="grid place-items-center my-20">
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
          <h3 className="text-primary max-w-md">Admin Login</h3>
        </span>

        <button
          disabled={loading}
          className="w-full flex items-center space-x-3 justify-center rounded-lg p-3 text-sm my-4 border-[1px] border-slate-200"
          type="button"
          onClick={googleSignIn}
        >
          <span className="w-6 object-contain mr-2">
            <img src="../google.svg" alt="logo" className="object-contain" />
          </span>
          Sign in with google
        </button>
      </Card>
    </section>
  );
}

export default AdminLoginPage;
