import { createContext, useContext } from "react"

export const ApplicationContext = createContext<any>(null)
export function ApplicationContextWrapper({ children }: any) {
  let name
  return <ApplicationContext.Provider value={{ name }}>{children}</ApplicationContext.Provider>
}

export function userApplicationContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(ApplicationContext)
}
