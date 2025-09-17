// app/layout.tsx
import Sidebar from "./_components/side-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // pathname can be inferred from segment existence

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="ml-sidebar flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
