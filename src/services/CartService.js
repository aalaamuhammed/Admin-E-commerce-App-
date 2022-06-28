import Localbase from "localbase";
const db = new Localbase("db");

export function AddToCart(item) {
  try {
    db.collection("items").add({
      key: item.key,
      id: item.id,
      productDetails: {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
      },
      quantity: item.quantity,
      price: item.price,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function UpdateCart(item) {
  try {
    let r = await db
      .collection("items")
      .doc({ id: item.id })
      .update({
        ...item,
      });
    console.log({ r }, item.id);
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
}

export async function GetFromCart(item) {
  try {
    const items = await db.collection("items").get();
    return items;
  } catch (error) {
    return [];
  }
}

export async function DeleteFromCart(item) {
  try {
    let r = await db.collection("items").doc({ id: item.id }).delete();
    console.log({ r }, item.id);
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
}

export async function CalculateCartTotalPrice() {
  const items = await GetFromCart();
  let totalPrice = [];
  for (const item of items) {
    totalPrice.push({
      name: item.productDetails.name,
      itemTotal: item.quantity * item.price,
    });
  }
  console.log({ totalPrice });

  let taxesDetails = [{ name: "Delivery", totalAmount: 20 }];
  let actualPrice = 0;
  actualPrice = totalPrice.reduce((acc, item) => acc + item.itemTotal, 0);
  console.log({ actualPrice });
  actualPrice += taxesDetails.reduce((acc, item) => acc + item.totalAmount, 0);
  console.log({ actualPrice });
  return { totalPrice, taxesDetails, actualPrice };
}
