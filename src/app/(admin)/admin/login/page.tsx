import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Login Admin | Pesona Bandung",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3D7A5E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C9971E]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
