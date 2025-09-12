import { NextRequest, NextResponse } from "next/server";

const NPM_SEARCH_API_URL = "https://registry.npmjs.org/-/v1/search";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  if (!query) {
    return new NextResponse(
      JSON.stringify({ error: 'Query parameter "q" is required' }),
      {
        status: 400,
      }
    );
  }

  const res = await fetch(`${NPM_SEARCH_API_URL}?text=${query}&size=5`);
  const data: NPMSearchResponse = await res.json();

  const packages = data.objects.map((p: PackageObject) => ({
    name: p.package.name,
    version: p.package.version,
    url: p.package.links.npm,
    description: p.package.description,
  }));

  return NextResponse.json(packages);
}
