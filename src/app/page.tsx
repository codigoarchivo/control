import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Diríjase a <Link href="/control" className="text-blue-500 underline hover:text-blue-700">Control</Link></h1>
    </div>
  );
}
