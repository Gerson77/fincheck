import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../../app/services/authService/signup";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("Nome obrigatório"),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail must be a string",
    })
    .email("E-mail é obrigatório"),
  password: z
    .string({
      required_error: "Senha é obrigatório",
      invalid_type_error: "Email must be a string",
    })
    .min(8, "Senha deve conter pelo menos 8 digitos"),
});

type FormDate = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormDate>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken)
    }catch {
      toast.error('Erro ao criar conta')
    }

  });

  return { handleSubmit, register, errors, isLoading };
}
