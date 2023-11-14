const fs = require("fs")

const path = "24.edi"

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err)
    return
  }

  const parsedEDIFACT = parseEDIFACT(data)
  console.log(parsedEDIFACT)
})

function parseEDIFACT(data) {
  const segments = data.split("\n").filter(Boolean)

  const parsedData = segments.map((segment) => {
    const [tag, ...elements] = segment.split("+")
    return { tag, elements }
  })

  const order = {
    customer: parsedData[0].elements[1],
    supplier: parsedData[0].elements[2],
    date: parsedData[0].elements[3],
    orderId: parsedData[2].elements[1],
    qty: parsedData[7].elements[1],
  }

  return order
}

// const UNH = `UNH+0001+ORDERS:D:96A:UN:EAN008`

// const UNS = `UNS+S`
// const MOA = `MOA+203:${orderData.quantity}:USD`
// const UNT = `UNT+10+0001`
// const UNZ = `UNZ+1+00000001`
