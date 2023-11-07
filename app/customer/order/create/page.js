import createEDI from "@/lib/createEDI"
import prisma from "@/lib/db"

export default async function page() {
  async function create(formData) {
    "use server"

    const customer = 1
    const status = "pending"
    const supplier = formData.get("supplier")
    const quantity = formData.get("quantity")
    const name = formData.get("name")

    const order = await prisma.order.create({
      data: {
        customerId: customer,
        supplierId: Number(supplier),
        status: status,

        orderItems: {
          create: [
            {
              quantityOrdered: Number(quantity),
              product: {
                connect: {
                  id: Number(name),
                },
              },
            },
          ],
        },
      },
    })

    const orderId = order.id

    createEDI({ orderId, customer, status, supplier, quantity, name })

    return order
  }

  return (
    <div className='flex w-full flex-col justify-center items-center py-10'>
      <h1 className='text-2xl font-bold'>Create an order</h1>
      <form className='flex flex-col gap-4 py-8' action={create}>
        <input
          type='text'
          name='name'
          placeholder='Product Name'
          className='border rounded-md py-2 px-3'
        />
        <input
          type='text'
          name='quantity'
          placeholder='Quantity'
          className='border rounded-md py-2 px-3'
        />
        <input
          type='text'
          name='supplier'
          placeholder='Supplier'
          className='border rounded-md py-2 px-3'
        />
        <button
          type='submit'
          className='py-2 rounded-md px-4 text-white hover:bg-neutral-400 bg-neutral-600'>
          Create
        </button>
      </form>
    </div>
  )
}
