"use client";

import { UserRegister } from "../../../lib/api";
import { login } from "../../../lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";

const initialValues: UserRegister = {
  email: "",
  password: "",
};

export default function SignIn() {
  // 1. login
  // 2. оновлення стану аутентифікації
  // 3. редірект (profile)
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    try {
      const user = await login(values);
      actions.resetForm();
      setUser(user);
      router.push("/profile");
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Something went wrong"));
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <main className={css.mainContent}>
        <form className={css.form}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>
          {error && <p className={css.error}>{error.message}</p>}
        </form>
      </main>
    </Formik>
  );
}
