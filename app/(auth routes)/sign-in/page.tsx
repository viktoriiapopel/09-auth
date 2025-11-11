"use client";

import Section from "@/components/Section/Section";
import { UserRegister } from "../../../lib/api";
import { login } from "../../../lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";

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

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    const user = await login(values);
    actions.resetForm();
    setUser(user);
    router.push("/profile");
  };

  return (
    <Section>
      <h1>Login Page</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
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

              <p className={css.error}>{error}</p>
            </form>
          </main>
        </Form>
      </Formik>
    </Section>
  );
}
