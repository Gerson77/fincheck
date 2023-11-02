import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";
import { SigninParams } from "../../../app/services/authService/signin";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.string({
    required_error: "E-mail é obrigatório",
    invalid_type_error: "E-mail must be a string",
  }).email("E-mail é obrigatório"),
  password: z.string({
    required_error: "Senha é obrigatório",
    invalid_type_error: "Email must be a string",
  }).min(8, 'Senha deve conter pelo menos 8 digitos')
})

type FormDate = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormDate>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken)
    }catch {
      toast.error('Credenciais inválidas')
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
