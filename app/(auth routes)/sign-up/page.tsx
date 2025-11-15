"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { UserRegister } from "../../../lib/api/api";
import { register } from "../../../lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";

const initialValues: UserRegister = {
  email: "",
  password: "",
};

export default function SignUp() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    try {
      const user = await register(values);

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
    <main className={css.mainContent}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={css.form}>
          <h1 className={css.formTitle}>Sign up</h1>

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
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error.message}</p>}
        </Form>
      </Formik>
    </main>
  );
}
