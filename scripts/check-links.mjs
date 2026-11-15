// Checks every external link in content/projects/*.mdx (front matter links
// and links in the write-up). Run with: npm run check:links
// Exits with an error if any link is broken, so CI can flag it.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "projects");
const found = new Map(); // url -> files that use it

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const urls = [
    ...Object.values(data.links ?? {}),
    ...[...content.matchAll(/https?:\/\/[^\s)"'<>]+/g)].map((m) => m[0]),
  ].filter((u) => typeof u === "string" && u.startsWith("http"));
  for (const url of urls) {
    found.set(url, [...(found.get(url) ?? []), file]);
  }
}

if (found.size === 0) {
  console.log("No external links to check yet.");
  process.exit(0);
}

async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "portfolio-link-check" },
      });
      if (res.ok) return null;
      if (method === "GET") return `HTTP ${res.status}`;
    } catch (error) {
      if (method === "GET") return error.name === "TimeoutError" ? "timed out" : "unreachable";
    }
  }
  return "unreachable";
}

let broken = 0;
for (const [url, files] of found) {
  const problem = await check(url);
  if (problem) {
    broken += 1;
    console.error(`BROKEN  ${url}  (${problem})  in ${[...new Set(files)].join(", ")}`);
  } else {
    console.log(`ok      ${url}`);
  }
}

console.log(`\n${found.size} links checked, ${broken} broken.`);
process.exit(broken > 0 ? 1 : 0);
