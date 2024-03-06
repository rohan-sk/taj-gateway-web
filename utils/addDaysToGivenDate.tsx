const AddNumberOfDays = (date: any, days: number) => {
  let result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export default AddNumberOfDays
