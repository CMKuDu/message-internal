// components/RegisterForm.tsx
export default function RegisterForm() {
  return (
    <form>
      <input type="text" placeholder="Tên người dùng" className="w-full p-2 border rounded mb-2" />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" />
      <input type="password" placeholder="Mật khẩu" className="w-full p-2 border rounded mb-4" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Đăng ký
      </button>
    </form>
  );
}
