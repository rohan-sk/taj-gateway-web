import React from "react"

export const RestrictSpecialChar = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const pressedKey = e.key
  if (
    pressedKey === "-" ||
    pressedKey === "." ||
    pressedKey === "+" ||
    pressedKey === "e" ||
    pressedKey === "E" ||
    (e.ctrlKey && e.key === "x") ||
    (e.ctrlKey && e.key === "a")
  ) {
    e.preventDefault()
  }
}
