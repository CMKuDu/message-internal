import { AuthAPI } from "@/api/Auth/Auth.Api";
import { RequestRegisterDTO } from "@/api/Auth/dto/req/ResquestRegister.dto";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/feature/authModalSlice";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

// components/RegisterForm.tsx
const registerSchema = z.object({
  firstname: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(20, "Username không được quá 20 ký tự")
    .regex(/^[a-zA-Z0-9_]+$/, "Username chỉ được chứa chữ, số và dấu gạch dưới"),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được quá 50 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"),
  confirmPassword: z
    .string()
    .min(1, "Xác nhận mật khẩu là bắt buộc")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"]
});
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange" // Validate khi user type
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const registerData: RequestRegisterDTO = {
        userName: data.firstname,
        email: data.email,
        password: data.password,
        rePassword: data.confirmPassword
      };
      await AuthAPI.Register(registerData);
      toast.success('Dang ky thanh cong')
      form.reset();
      dispatch(openModal('login'));
    } catch (error) {
      toast.error("Đăng ký thất bại!");
      console.error("Error register", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Username Field */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập username"
                  disabled={isLoading}
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Nhập email"
                  disabled={isLoading}
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Mật khẩu <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    disabled={isLoading}
                    className="h-11 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
              {/* Password requirements */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Mật khẩu phải chứa:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>Ít nhất 6 ký tự</li>
                  <li>1 chữ thường, 1 chữ hoa và 1 số</li>
                </ul>
              </div>
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    disabled={isLoading}
                    className="h-11 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
          disabled={isLoading || !form.formState.isValid}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Đang tạo tài khoản...
            </>
          ) : (
            <>
              <UserPlus size={18} className="mr-2" />
              Tạo tài khoản
            </>
          )}
        </Button>

        {/* Terms & Conditions */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Điều khoản sử dụng
          </button>
          {" "}và{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Chính sách bảo mật
          </button>
          {" "}của chúng tôi.
        </p>
      </form>
    </Form>
  );
}
