import Link from "next/link"

export default function Home() {
  return (
    <main className=''>
      <div className='py-10 items-center w-full flex gap-6'>
        <Link href='/customer' className='py-2 rounded-md px-4 border '>
          Customer
        </Link>
        <Link className='py-2 rounded-md px-4 border ' href='/supplier'>
          Supplier
        </Link>
      </div>
    </main>
  )
}
