


export const invoiceFieldsRestrictions = (e: any, handler: Function) => {
    const { value } = e?.target
    if (value === "" || value?.match(/^[A-Za-z0-9 ]+$/)) {
      handler(e)
    }

}