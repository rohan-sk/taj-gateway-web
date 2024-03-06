import PageLayoutComponent from "../../../layout/PageLayoutComponent";

export default function Preview(props: any) {
  return (
    <>
      <PageLayoutComponent {...props} />
    </>
  );
}

export async function getStaticProps(context: any) {
    return {
      notFound: true,
    };
}
