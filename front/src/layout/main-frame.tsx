import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from 'react-router-dom';

export function MainFrame() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <section className='p-2 min-h-screen bg-background text-foreground'>
        <Outlet></Outlet>
        <Toaster />
        <h1 className='w-full fixed bottom-0 text-center text-zinc-600 py-2'>Made by Obside</h1>
      </section>
    </ThemeProvider>
  )
}
