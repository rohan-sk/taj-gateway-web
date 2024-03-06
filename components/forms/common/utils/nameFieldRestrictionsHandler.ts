export const nameFieldsRestrictions = (e: any, handler: Function) => {
    const { value } = e?.target
    if (value === "" || value?.match(/^[a-zA-Z ]{0,50}$/)) {
        handler(e)

    }

}