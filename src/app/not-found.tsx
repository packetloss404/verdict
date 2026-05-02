import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAFAF8] text-[#1C2030]">
      <h1 className="text-4xl font-medium mb-2">404</h1>
      <p className="text-[#5C5345] mb-6">This page doesn't exist.</p>
      <Link to="/" className="underline text-[#1C2B4A]">
        Back home
      </Link>
    </div>
  );
}
