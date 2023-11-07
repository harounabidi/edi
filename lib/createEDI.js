import fs from "fs"

export default function createEDI(orderData) {
  const UNB = `UNB+UNOC:3+${orderData.customer}+${
    orderData.supplier
  }+${getFormattedDateTime()}+00000001`
  const UNH = `UNH+0001+ORDERS:D:96A:UN:EAN008`
  const BGM = `BGM+220::9+${orderData.orderId}+9`
  const DTM = `DTM+137:${getFormattedDateTime()}+102`
  const NAD_BY = `NAD+BY+${orderData.customer}::92`
  const NAD_SU = `NAD+SU+${orderData.supplier}::92`
  const UNS = `UNS+S`
  const MOA = `MOA+203:${orderData.quantity}:USD`
  const UNT = `UNT+10+0001`
  const UNZ = `UNZ+1+00000001`

  // Combine segments into an EDIFACT message
  const edifactMessage = [
    UNB,
    UNH,
    BGM,
    DTM,
    NAD_BY,
    NAD_SU,
    UNS,
    MOA,
    UNT,
    UNZ,
  ].join("\n")

  // Save the EDIFACT message to a file
  const filename = `order_${orderData.orderNumber}.edi`
  fs.writeFileSync(filename, edifactMessage, "utf8")
}

function getFormattedDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  const hour = now.getHours().toString().padStart(2, "0")
  const minute = now.getMinutes().toString().padStart(2, "0")
  return `${year}${month}${day}:${hour}${minute}`
}

// Example order data
// const orderData = {
//   sender: "SENDER",
//   receiver: "RECEIVER",
//   orderNumber: "ORDER1234",
//   customerId: "CUSTOMERID",
//   supplierId: "SUPPLIERID",
//   totalAmount: 1000,
// }

// Call the function to create the EDIFACT file
// createEDI(orderData)
