import { Outlet } from "react-router-dom";
import { Logo } from "../../view/Components/Logo";
import illustration from "../../assets/illustration.png";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center flex-col">
        <Logo className="text-gray-500 h-6" />

        <div className="mt-16 w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full lg:flex justify-center items-center p-8 relative hidden">
        <img
          src={illustration}
          className="w-full h-full object-cover rounded-[32px] max-w-[656px] max-h-[960px] select-none"
        />
        <div className="max-w-[656px] bottom-8 bg-white p-10 mx-8 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e
            o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}

