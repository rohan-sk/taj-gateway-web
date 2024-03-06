export const getLowInventoryLabel = (count: number) => {
  if (count > 1 && count < 6) {
    return `Last ${count} Rooms Available`
  } else if (count === 1) {
    return `Last ${count} Room Available`
  } else if (count <= 0) {
    return `Last Room Available`
  }
}
