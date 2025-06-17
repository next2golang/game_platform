declare global {
  interface Window {
    paypal: any;
  }
}

"use client"

export interface PayPalPaymentItem {
  name: string
  quantity: string
  price: string
  currency: string
}

export interface PayPalPaymentOptions {
  items: PayPalPaymentItem[]
  total: string
  currency: string
  description?: string
  onSuccess?: (details: any) => void
  onError?: (error: any) => void
  onCancel?: () => void
}

export class PayPalPaymentService {
  private paypal: any

  constructor() {
    this.loadPayPalScript()
  }

  private async loadPayPalScript() {
    if (typeof window !== "undefined" && !window.paypal) {
      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=JPY`
      script.async = true
      document.head.appendChild(script)

      return new Promise((resolve) => {
        script.onload = () => {
          this.paypal = window.paypal
          resolve(window.paypal)
        }
      })
    }
    return window.paypal
  }

  async createPayment(options: PayPalPaymentOptions) {
    if (!this.paypal) {
      await this.loadPayPalScript()
    }

    return this.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: options.currency,
                value: options.total,
                breakdown: {
                  item_total: {
                    currency_code: options.currency,
                    value: options.total,
                  },
                },
              },
              items: options.items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                unit_amount: {
                  currency_code: item.currency,
                  value: item.price,
                },
              })),
              description: options.description,
            },
          ],
        })
      },
      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture()
        options.onSuccess?.(details)
        return details
      },
      onError: (error: any) => {
        console.error("PayPal payment error:", error)
        options.onError?.(error)
      },
      onCancel: () => {
        console.log("PayPal payment cancelled")
        options.onCancel?.()
      },
    })
  }
}

export const paypalService = new PayPalPaymentService()
