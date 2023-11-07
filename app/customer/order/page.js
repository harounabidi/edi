import prisma from "@/lib/db"

export default async function page() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: true,
    },
  })

  console.log(orders[0].orderItems)

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
    return date.toLocaleString(undefined, options)
  }

  return (
    <>
      <h1 className='font-bold text-2xl'>Orders</h1>
      <div className='py-8'>
        <table>
          <thead className='font-thin'>
            <tr>
              <th className='p-4 text-sm text-gray-500'>Order ID</th>
              <th className='p-4 text-sm text-gray-500'>Order Date</th>
              <th className='p-4 text-sm text-gray-500'>Supplier</th>
              <th className='p-4 text-sm text-gray-500'>Items</th>
              <th className='p-4 text-sm text-gray-500'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{order.supplierId}</td>
                <td>
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.id} className='flex flex-col gap-3'>
                      <span>Product id: {orderItem.productId}</span>
                      <span>Product Qty: {orderItem.quantityOrdered}</span>
                    </div>
                  ))}
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
