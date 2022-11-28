export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  //текущая query
  const q = url.searchParams.get("q");
  console.log(url);
  //   const contacts = await getContacts(q);
  //   return { contacts, q };
}
