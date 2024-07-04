import Login from "@/components/Login/Login";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <section className="bg-menu flex flex-col justify-center gap-10 content-center text-center p-4 sm:p-8">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 sm:mb-12 md:mb-16">
        Login
      </h1>
      <Login />
      <div className="flex flex-col sm:flex-row gap-4 text-base sm:text-lg text-gray-500 mt-8 sm:mt-12 mx-auto">
        <Link href="/login/recuperar">Esqueceu a senha?</Link>
        <hr className="hidden sm:block w-[1px] h-8 bg-gray-800 mx-4"></hr>
        <Link href="/login/cadastrar">Cadastre-se</Link>
      </div>
    </section>
  );
}
