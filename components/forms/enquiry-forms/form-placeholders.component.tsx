export const placeholderValues = (props: any, setPlaceholder: any) => {
  props?.map((value: any) => {
    switch (value?.inputFieldType) {
      case "text":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            name: value?.labelText,
          }
        })
        break
      case "email":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            email: value?.labelText,
          }
        })
        break
      case "dropDown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            contact: value?.labelText,
          }
        })
        break
      case "phoneNumber":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            phone: value?.labelText,
          }
        })
        break
      case "search":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            search: value?.labelText,
          }
        })
        break
      case "textarea":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            enquiry: value?.labelText,
          }
        })
        break
      default:
        break
    }
  })
}
