"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { UserRegister } from "../../../lib/api";
import { register } from "../../../lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";

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
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (
    values: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) => {
    try {
      const user = await register(values);

      // 🧹 Очищаємо форму тільки після успішного запиту
      actions.resetForm();

      // 🔄 Оновлюємо користувача у сторі
      setUser(user);

      // 🔁 Редірект на сторінку профілю
      router.push("/profile");
    } catch (err) {
      // ❌ Якщо помилка — просто зберігаємо її у стан
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Something went wrong"));
      }

      // 🔹 За бажанням можна очистити тільки поля пароля
      // actions.setFieldValue("password", "");
    }
  };

  return (
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
          {error && <p className={css.error}>{error.message}</p>}
        </form>
      </main>
    </Formik>
  );
}
