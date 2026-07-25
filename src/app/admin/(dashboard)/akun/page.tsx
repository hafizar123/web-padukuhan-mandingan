import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GantiPasswordForm from "@/components/admin/GantiPasswordForm";

export const metadata = { title: "Akun Saya - Admin Padukuhan Mandingan" };

export default async function AkunPage() {
  const session = await auth();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Akun Saya</h1>
      <p className="text-gray-500 mb-6">Kelola informasi akun admin kamu</p>

      {/* Info Akun */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Nama</span>
            <span className="font-medium">{session?.user?.name}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{session?.user?.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Role</span>
            <span className="font-medium">{session?.user?.role?.replace("_", " ")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Ganti Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ganti Password</CardTitle>
        </CardHeader>
        <CardContent>
          <GantiPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
