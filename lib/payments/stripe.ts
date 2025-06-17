"use client"

import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export interface PaymentItem {
  id: string
  name: string
  price: number
  currency: string
  description?: string
  image?: string
}

export interface PaymentSession {
  sessionId: string
  url: string
}

export class StripePaymentService {
  private stripe: any

  constructor() {
    this.initStripe()
  }

  private async initStripe() {
    this.stripe = await stripePromise
  }

  async createCheckoutSession(
    items: PaymentItem[],
    options?: {
      successUrl?: string
      cancelUrl?: string
      customerEmail?: string
      metadata?: Record<string, string>
    },
  ): Promise<PaymentSession> {
    try {
      const response = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          successUrl: options?.successUrl || `${window.location.origin}/payment/success`,
          cancelUrl: options?.cancelUrl || `${window.location.origin}/payment/cancel`,
          customerEmail: options?.customerEmail,
          metadata: options?.metadata,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const session = await response.json()
      return session
    } catch (error) {
      console.error("Error creating checkout session:", error)
      throw error
    }
  }

  async redirectToCheckout(sessionId: string) {
    if (!this.stripe) {
      await this.initStripe()
    }

    const { error } = await this.stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      console.error("Error redirecting to checkout:", error)
      throw error
    }
  }

  async createPaymentIntent(amount: number, currency = "jpy", metadata?: Record<string, string>) {
    try {
      const response = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment intent")
      }

      return await response.json()
    } catch (error) {
      console.error("Error creating payment intent:", error)
      throw error
    }
  }
}

export const stripeService = new StripePaymentService()
