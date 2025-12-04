import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/input.component";
import AnimationWrapper from "../common/page-animation";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();
  const navigate = useNavigate();
  const { setUserAuth } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(authForm.current);
    const formData = Object.fromEntries(form.entries());
    const { fullname, email, password } = formData;

    if (type !== "sign-in" && (!fullname || fullname.length < 3)) {
      return toast.error("Full name must be at least 3 characters long");
    }

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    const route = type === "sign-in" ? "/signin" : "/signup";

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}${route}`,
        formData
      );

      toast.success(data.message);

      // ✅ save user info locally
      setUserAuth({
        fullname: data.fullname,
        email: data.email,
        token: data.token || null,
      });

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={authForm} onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Join Today"}
          </h1>

          {type !== "sign-in" && (
            <InputBox name="fullname" type="text" placeholder="Full Name" icon="fi-rr-user" />
          )}

          <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
          <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />

          <button
            className={`btn-dark center mt-14 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : type.replace("-", " ")}
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-black text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Sign up today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-black text-xl text-center">
              Already a member?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
