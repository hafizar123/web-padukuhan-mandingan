import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      {children}
      <Toaster />
    </SessionProviderWrapper>
  );
}
