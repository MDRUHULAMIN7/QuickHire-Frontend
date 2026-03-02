export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-bold">QuickHire</div>
        <nav className="text-sm space-x-4">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
        </nav>
      </div>
    </header>
  );
}
