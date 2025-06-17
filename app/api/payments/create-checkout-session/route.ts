import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { items, successUrl, cancelUrl, customerEmail, metadata } = await request.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: item.currency || "jpy",
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price,
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: metadata || {},
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["JP", "US", "GB", "CA", "AU"],
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
