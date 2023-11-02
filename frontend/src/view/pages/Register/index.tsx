import { Link } from "react-router-dom";
import { Button } from "../../../view/Components/Button";
import { Input } from "../../../view/Components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();
  return (
    <div>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui um conta?
          </span>
          <Link
            to="/login"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="name"
          placeholder="Nome"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button variant="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </div>
  );
}
