"use client";

import React from "react";
import { loginAction } from "@/actions/login/login-action";
import Input from "../FormComponentes/Input";
import { Button } from "../FormComponentes/Button";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(loginAction, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) window.location.href = "/login";
  }, [state.ok]);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 sm:gap-6 md:gap-7 items-center p-4 sm:p-6"
    >
      <Input
        placeholder="Insira seu nome ou e-mail"
        name="username"
        id="username"
        type="text"
        required
        className="w-full sm:w-80 md:w-96 max-w-xs"
      />
      <Input
        placeholder="Insira sua senha"
        name="password"
        id="password"
        type="password"
        required
        className="w-full sm:w-80 md:w-96 max-w-xs"
      />
      <Button className="btn w-full sm:w-40 md:w-52">Entrar</Button>
      <p className="text-red-500 mt-2">{state.error}</p>
    </form>
  );
}
