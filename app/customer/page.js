import Link from "next/link"

export default function page() {
  return (
    <div className='w-full flex flex-col items-center py-10'>
      <h1 className='text-2xl font-bold'>Customer</h1>
      <div className='py-10 flex gap-6'>
        <Link
          href='/customer/order/create'
          className='py-2 rounded-md px-4 border '>
          Create Order
        </Link>
        <Link className='py-2 rounded-md px-4 border ' href='/customer/order'>
          All Orders
        </Link>
      </div>
    </div>
  )
}
