export default async function handler(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    let arr: any = []
    await req?.body?.pages?.map((slugs: any) => {
      res.revalidate(slugs)
      arr.push(slugs)
    })
    return req?.body?.pages?.length > 0
      ? res.json({ revalidated: true, CachePurgedSlugs: arr })
      : res.json({ message: "Please validate the payload" })
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}
