// Submits every URL in public/sitemap.xml to IndexNow (Bing, Yandex, Seznam, Naver).
// Run manually after publishing/updating content: node scripts/submitIndexNow.js
import fs from "fs";
import path from "path";
import https from "https";

const SITE = "dev-brains-ai.com";
const KEY = "405fb067d75bc80f737f6c8538b2637c";
const KEY_LOCATION = `https://${SITE}/${KEY}.txt`;

const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
const xml = fs.readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error("No URLs found in sitemap.xml — aborting.");
  process.exit(1);
}

const payload = JSON.stringify({
  host: SITE,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
});

const req = https.request(
  {
    hostname: "api.indexnow.org",
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
    },
  },
  (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      console.log(`Submitted ${urls.length} URLs. Status: ${res.statusCode} ${res.statusMessage}`);
      if (body) console.log(body);
    });
  }
);

req.on("error", (err) => console.error("IndexNow submission failed:", err.message));
req.write(payload);
req.end();
