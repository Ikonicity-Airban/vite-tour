import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Card } from "flowbite-react";
import { LogoComponent } from "../../components";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      if (
        user &&
        [
          "sylva.iyke.si@gmail.com",
          "ikonicityairban@gmail.com",
          "idinmasylvanus@gmail.com",
        ].includes(user?.email || "")
      )
        navigate("/admin");
      else {
        user.delete();
        throw new Error("You are not authorized");
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;

        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  //return
  return (
    <section className="grid place-items-center h-screen">
      <div className=" my-auto">
        <h2 className="font-medium mb-20 text-primary text-center">
          Welcome to the Admin Panel <br />
          Login to continue
        </h2>
        <Card className="smallScreens:min-w-[320px] py-10 w-5/6 max-w-md mt-10 mx-auto">
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
      </div>
    </section>
  );
}

export default AdminLoginPage;
