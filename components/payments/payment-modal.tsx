"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientButton } from "@/components/ui/gradient-button"
import { stripeService, type PaymentItem } from "@/lib/payments/stripe"
import { paypalService } from "@/lib/payments/paypal"
import { CreditCard, X, Shield, AlertCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  items: PaymentItem[]
  onSuccess?: (paymentDetails: any) => void
  onError?: (error: any) => void
}

export function PaymentModal({ isOpen, onClose, items, onSuccess, onError }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "crypto">("stripe")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleStripePayment = async () => {
    setLoading(true)
    try {
      const session = await stripeService.createCheckoutSession(items, {
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      })

      await stripeService.redirectToCheckout(session.sessionId)
    } catch (error) {
      console.error("Stripe payment error:", error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayPalPayment = async () => {
    setLoading(true)
    try {
      const paypalItems = items.map((item) => ({
        name: item.name,
        quantity: "1",
        price: item.price.toString(),
        currency: item.currency,
      }))

      const paypalButtons = await paypalService.createPayment({
        items: paypalItems,
        total: total.toString(),
        currency: "JPY",
        description: `Payment for ${items.length} items`,
        onSuccess: (details) => {
          onSuccess?.(details)
          onClose()
        },
        onError: (error) => {
          onError?.(error)
        },
        onCancel: () => {
          setLoading(false)
        },
      })

      // Render PayPal buttons
      const paypalContainer = document.getElementById("paypal-button-container")
      if (paypalContainer) {
        paypalButtons.render("#paypal-button-container")
      }
    } catch (error) {
      console.error("PayPal payment error:", error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCryptoPayment = async () => {
    setLoading(true)
    try {
      // Implement cryptocurrency payment logic here
      // This would typically involve integrating with services like CoinGate, BitPay, etc.
      console.log("Crypto payment not implemented yet")
      onError?.(new Error("Cryptocurrency payments coming soon"))
    } catch (error) {
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Card className="bg-slate-900/95 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  お支払い
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">注文内容</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-white/80">{item.name}</span>
                        <span className="text-white font-semibold">¥{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">合計</span>
                        <span className="text-white font-bold text-lg">¥{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
                    <TabsTrigger value="stripe" className="data-[state=active]:bg-white/10 text-white">
                      クレジットカード
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="data-[state=active]:bg-white/10 text-white">
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="data-[state=active]:bg-white/10 text-white">
                      暗号通貨
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="stripe" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName" className="text-white">
                          カード名義
                        </Label>
                        <Input
                          id="cardName"
                          placeholder="山田 太郎"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber" className="text-white">
                          カード番号
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-white">
                            有効期限
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc" className="text-white">
                            CVC
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                    </div>

                    <GradientButton
                      onClick={handleStripePayment}
                      loading={loading}
                      fullWidth
                      size="lg"
                      icon={<CreditCard className="w-4 h-4" />}
                    >
                      ¥{total.toLocaleString()}を支払う
                    </GradientButton>
                  </TabsContent>

                  <TabsContent value="paypal" className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-white/80 mb-4">
                        PayPalアカウントまたはクレジットカードで安全にお支払いいただけます
                      </div>
                      <div id="paypal-button-container" className="min-h-[50px]" />
                      <GradientButton
                        onClick={handlePayPalPayment}
                        loading={loading}
                        fullWidth
                        size="lg"
                        variant="warning"
                      >
                        PayPalで支払う
                      </GradientButton>
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="space-y-4">
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">暗号通貨決済</h3>
                      <p className="text-white/70 mb-4">Bitcoin、Ethereum、その他の暗号通貨での支払いに対応予定です</p>
                      <GradientButton
                        onClick={handleCryptoPayment}
                        loading={loading}
                        fullWidth
                        size="lg"
                        variant="secondary"
                        disabled
                      >
                        近日対応予定
                      </GradientButton>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm">SSL暗号化により、お客様の情報は安全に保護されています</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
