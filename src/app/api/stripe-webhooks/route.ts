import { headers } from "next/headers";

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }
  } catch (error) {}
};
