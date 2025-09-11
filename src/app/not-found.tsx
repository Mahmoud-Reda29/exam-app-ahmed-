export default function NotFound() {
  return (
    <div className="p-6 bg-white text-blue-600 rounded flex justify-center gap-4 flex-col items-center h-screen">
      <h2 className="text-6xl font-bold">🚫 Page Not Found (404)</h2>
      <p className="mt-2 text-xl">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
