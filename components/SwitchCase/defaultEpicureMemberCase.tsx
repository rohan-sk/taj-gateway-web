import { Box } from '@mui/material'
import React,{useContext} from 'react'
import { useLoggedIn } from '../../utils/hooks/useLoggedIn'
import { IHCLContext } from '../../PresentationalComponents/lib/prepare-ihcl-context'

export default function DefaultEpicureMemberCase({props}:any) {
    const {cases, defaultCase} = props
    const user = useLoggedIn()
    const epicureMemberId = global?.localStorage?.getItem("epicureMemberID")
const context = useContext(IHCLContext)


    const EpicureMemberKey = () => {
        if(user && epicureMemberId) {
            return "EPICURE_KNOWN_USER"
        } 
        else {
            return "EPICURE_ANONYMOUS_USER"
        }
    }

    const currentCase = cases?.filter(
        ({value}: any, index: number) => value ===EpicureMemberKey()
    )   
    
  return (
    <Box sx={{padding:"0vw 12vw"}}>
      {context?.renderComponent(currentCase?.[0]?.item?.[0]?._type,{
        ...currentCase?.[0]?.item?.[0]
      })}
    </Box>
  )
}
