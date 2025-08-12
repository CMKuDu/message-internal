// components/LoginForm.tsx
import { AuthAPI } from '@/api/Auth/Auth.Api';
import { RequestLoginDTO } from '@/api/Auth/dto/req/ResquestLogin.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod'
import { useDispatch } from "react-redux";
import { setAccessToken } from '@/store/feature/authSlice';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const dispatch = useDispatch();
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, 'Email là bắt buộc')
      .email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu không được quá 50 ký tự")
  })
  type LoginFormData = z.infer<typeof loginSchema>;
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData: RequestLoginDTO = {
        email: data.email,
        password: data.password
      };
      const res = await AuthAPI.Login(loginData)
      const accessToken = res.token.accessToken;
      dispatch(setAccessToken(accessToken))
      toast.success('Đăng nhập thành công');
    } catch (error) {
      toast.error("Đăng ký thất bại!");
      console.error("Error register", error);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...form.register("email")}
        className="w-full p-2 border rounded mb-2"
      />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Mật khẩu"
        {...form.register("password")}
        className="w-full p-2 border rounded mb-4"
      />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
      )}

      <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Đăng nhập
      </Button>
    </form>
  );
}
