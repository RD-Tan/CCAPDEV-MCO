import "@/styles/auth-styles.css";
import { AuthContext } from "@/hook/context";
import { useContext } from "react";

import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { makeServerURL } from "@/hook/url";

export default function Login() {
  const navigate = useNavigate();
  const [, setUsername] = useContext(AuthContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const trimmedData = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => {
        return [key, value.toString().trim()];
      })
    );

    try {
      const response = await fetch(makeServerURL(`login`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(formData.get("username") as string);
        navigate("/");
        toast.info(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <form className="login-contents" onSubmit={login}>
        <label htmlFor="uname">Username</label>
        <input type="text" id="uname" name="username" />
        <label htmlFor="pwrd">Password</label>
        <input type="password" id="pwrd" name="password" />

        <button className="round-button auth-submit-button" type="submit">
          Continue
        </button>
      </form>

      <p className="auth-msg-link">New to PhilJunction? <Link className="auth-link" to="/auth/signup">Sign up</Link></p>
    </>
  );
}
