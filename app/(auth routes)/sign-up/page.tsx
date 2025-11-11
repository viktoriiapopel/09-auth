"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";

import Section from "@/components/Section/Section";
import { UserRegister } from "../../../lib/api";
import { register } from "../../../lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";

const initialValues: UserRegister = {
  email: "",
  password: "",
};

export default function SignUp() {
  // 1. register
  // 2. оновлення стану аутентифікації
  // 3. редірект

  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    const user = await register(values);
    setUser(user);
    router.push("/profile");

    actions.resetForm();
  };

  return (
    <Section>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <main className={css.mainContent}>
          <h1 className={css.formTitle}>Sign up</h1>
          <form className={css.form}>
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
                Register
              </button>
            </div>

            <p className={css.error}>Error</p>
          </form>
        </main>
      </Formik>
    </Section>
  );
}
