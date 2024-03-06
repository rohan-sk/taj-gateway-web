export const fetchBreadSchema = (crumblist: any, router: any) => {
  let itemListElement: any = [];
  const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
  crumblist?.map((obj: any, index: number) => {
    itemListElement?.push({
      "@type" : "ListItem",
      position: index + 1,
      name: obj?.text,
      item: index < crumblist?.length - 1 ? `${origin}/en-in/${obj.href}` : "",
    });
  });
  return {
    "@context": "http://www.schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement,
  };
};
