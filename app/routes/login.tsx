import { useState, useRef, useEffect } from "react";
import FormField from "~/components/form-field";
import Layout from "~/components/layout";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "~/utils/validators.server";
import { login, registration } from "~/utils/auth.server";

import { useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const action = form.get("_action");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof action !== "string"
  ) {
    return json(
      {
        error: "Invalid form data",
        form: action,
      },
      { status: 400 }
    );
  }
  if (
    action === "signup" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json(
      {
        error: "Invalid form data",
        form: action,
      },
      { status: 400 }
    );
  }
  const errors = {
    email: emailValidation(email),
    password: passwordValidation(password),
    ...(action === "signup"
      ? {
          firstName: nameValidation((firstName as string) || ""),
          lastName: nameValidation((lastName as string) || ""),
        }
      : {}),
  };
  if (Object.values(errors).some(Boolean)) {
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );
  }

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "signup": {
      firstName = firstName as string;
      lastName = lastName as string;
      return await registration({ firstName, lastName, email, password });
    }
    default:
      return json({ error: "Invalid form" }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [action, setAction] = useState("login");
  const firstLoad = useRef(true);
  const [formInfo, setformInfo] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.firstName || "",
    lastName: actionData?.fields?.lastName || "",
  });
  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setformInfo({
      ...formInfo,
      [field]: e.target.value,
    });
  };
  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };

      setErrors(newState);
      setFormError("");
      setformInfo(newState);
    }
  }, [action]);
  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formInfo]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);
  return (
    <Layout>
      <button
        onClick={() => setAction(action === "login" ? "signup" : "login")}
        className="w-70 absolute top-4 right-4 p-2
          animate-[scaleFromCenter_1s_ease-in-out] rounded-xl my-2 text-2xl text-sky-700 transition duration-300 hover:-translate-y-1 hover:bg-sky-700 hover:text-sky-50"
      >
        {action === "login" ? "Sign Up" : "Sign In "}
      </button>

      <div className="h-full flex justify-center items-center flex-col gap-y-4 mx-6 ">
        <h2 className="text-4xl font-extrabold text-center pt-[120px] text-sky-700 capitalize animate-[shake_1s_ease-in-out] ">
          Welcome to Chat-Chat
        </h2>
        <p className="text-2xl font-extrabold text-center text-sky-700 capitalize animate-[shake_1s_ease-in-out] ">
          {action === "login"
            ? "Log in to your account"
            : "Sign up to get started"}
        </p>
        <form
          method="post"
          className="my-10 animate-[scaleFromCenter_1s_ease-in-out] rounded-xl bg-sky-50 p-6 flex flex-col items-center "
        >
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {formError}
          </div>
          {action !== "login" ? (
            <>
              <FormField
                htmlFor="firstName"
                placeholder="John"
                label="First Name"
                value={formInfo.firstName}
                onChange={(e) => handleInputValue(e, "firstName")}
                error={errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                placeholder="Doe"
                label="Last Name"
                value={formInfo.lastName}
                onChange={(e) => handleInputValue(e, "lastName")}
                error={errors?.lastName}
              />
            </>
          ) : null}
          <FormField
            htmlFor="email"
            placeholder="examle@gmail.com"
            label="Email"
            value={formInfo.email}
            onChange={(e) => handleInputValue(e, "email")}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            type="password"
            placeholder="exaMple**123"
            label="Password"
            value={formInfo.password}
            onChange={(e) => handleInputValue(e, "password")}
            error={errors?.password}
          />
          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="w-1/2  p-2 rounded-xl my-2 text-2xl text-sky-700 transition duration-300 hover:-translate-y-1 hover:bg-sky-700 hover:text-sky-50"
            >
              {action === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
