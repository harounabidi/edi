import Link from "next/link"

export default function Layout({ children }) {
  return (
    <div className='flex w-full px-20 flex-col justify-center items-center py-10'>
      <div className=' w-full flex items-start'>
        <Link href='/' className='py-2 rounded-md px-4 border '>
          Home
        </Link>
      </div>
      {children}
    </div>
  )
}
