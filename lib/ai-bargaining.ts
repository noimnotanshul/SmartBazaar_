export function calculateFloorPrice(price: number, floor?: number | null) {
  if (floor && floor > 0) return floor
  return Math.ceil(price * 0.7)
}

export function processUserOffer(params: {
  offer: number
  price: number
  floor: number
  round: number
}): { accepted: boolean; reply: string; counter?: number } {
  const { offer, price, floor, round } = params

  if (offer >= price) {
    return {
      accepted: true,
      reply:
        "Bahut badiya! Full price pe le rahe ho — deal pakki. Cart mein add kar deta hoon is rate pe.",
    }
  }

  if (offer >= floor && offer < price) {
    if (offer >= price * 0.9 || round >= 2) {
      return {
        accepted: true,
        reply: `Theek hai ji, aapke liye ₹${offer} final. Izzat se deal — cart mein daal deta hoon.`,
      }
    }
    const mid = Math.ceil((offer + price) / 2)
    const counter = Math.max(floor, Math.min(mid, price - 10))
    return {
      accepted: false,
      counter,
      reply: `Samajh gaya ji. Thoda aur soch ke ₹${counter} pe deal karte hain? Quality ke hisaab se fair hai.`,
    }
  }

  if (offer < floor) {
    const gentle = Math.min(price - 20, Math.max(floor, Math.ceil(floor * 1.05)))
    return {
      accepted: false,
      counter: gentle,
      reply: `Bhaiya, itne mein nahi ho payega — cost hi nahi nikalegi. ₹${gentle} se neeche mushkil hai. Thoda adjust karo na?`,
    }
  }

  return {
    accepted: false,
    counter: Math.ceil((floor + price) / 2),
    reply: "Aap apna best price batao, main dekhata hoon kya kar sakte hain.",
  }
}
