import Error from "next/error"
import { NextPage } from "next"

const ErrorPage: NextPage = ({ statusCode }: any) => {
  return <Error statusCode={statusCode}></Error>
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
