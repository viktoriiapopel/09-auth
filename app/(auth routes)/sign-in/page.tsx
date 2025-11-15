"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { UserRegister } from "@/lib/api/api";

const initialValues: UserRegister = {
  email: "",
  password: "",
};

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    try {
      const user = await login(values);
      setUser(user);
      actions.resetForm();
      router.push("/profile");
    } catch (err) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Something went wrong"));
    }
  };

  return (
    <main className={css.mainContent}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={css.form}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <Field
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
        </Form>
      </Formik>
    </main>
  );
}
