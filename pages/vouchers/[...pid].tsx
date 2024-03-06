import { basePageServerSide } from "../../lib/getPageSchema"
import PageLayoutComponent from "../../layout/PageLayoutComponent"

export default function Preview(props: any) {
  return <PageLayoutComponent {...props} />
}
export const getServerSideProps = async (context: any) => {
  const baseProps = await basePageServerSide(
    context,
    `/voucher-detail`,
    false,
    false,
    true
  )
  return baseProps
}
