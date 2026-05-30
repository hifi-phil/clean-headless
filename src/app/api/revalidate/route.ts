import { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();

    const signature = crypto
      .createHmac("sha256", process.env.UMBRACO_REVALIDATE_SECRET || "")
      .update(text)
      .digest("hex");

    const trusted = Buffer.from(`sha256=${signature}`, "ascii");
    const untrusted = Buffer.from(
      request.headers.get("x-hub-signature-256") || "",
      "ascii"
    );

    if (!crypto.timingSafeEqual(trusted, untrusted)) {
      console.log("[Next.js] Invalid signature.", {
        trusted: trusted.toString("hex"),
        untrusted: untrusted.toString("hex"),
      });
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

   const { contentPath, updateArticles, updateNavigation, updateLocalisation, isTrashed, isDeleted, isUnpublished } = JSON.parse(text) as RevalidatePayload;

    if(contentPath) {
        let url = removeLastSlash(contentPath)
        if(url === '') url = '/';
        revalidatePath(url);
        console.log(`revalidated content path ${url}`)
    }

    if(updateArticles) {
        revalidateTag('articles')
        console.log(`revalidated articles tag`)
    }

    if(updateNavigation) {
      revalidateTag('navigation')
      console.log(`revalidated layout navigation`)
    }

    if(updateLocalisation) {
      revalidateTag('localisation')
      console.log(`revalidated localisation`)
    }

    if(isTrashed || isDeleted || isUnpublished) {
        revalidatePath('/', 'layout');
        console.log(`purged entire cache`)
    }

  } catch (error : any) {
    console.log(`Revalidate webhook error: ${error.message}`)
    return new Response(`Revalidate webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}

interface RevalidatePayload {
    contentPath: string,
    updateArticles: boolean,
    updateNavigation: boolean,
    updateLocalisation: boolean,
    isTrashed: boolean,
    isDeleted: boolean,
    isUnpublished: boolean,
}

function removeLastSlash(url: string): string {
    if (url.endsWith('/')) {
      return url.slice(0, -1);
    }
    return url;
  }