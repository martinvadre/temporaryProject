import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/sidebar"
import Navbar from "../navbar/navbar"

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider /*defaultOpen={true}*/>
        <AppSidebar />
        <main className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Navbar />
            {children}
        </main>
    </SidebarProvider>
  )
}
