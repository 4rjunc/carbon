import Connect from "./components/Connect";

export default function Home() {
  return (
    <main>
      <nav className=" border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="carbon"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              carbon
            </span>
          </a>

          <Connect />
        </div>
      </nav>
    </main>
  );
}
