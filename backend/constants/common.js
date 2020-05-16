module.exports = {
    MinPurchaseToAvailShippingCost: 399,
    deliveryCharge: 40,
    status: ['queued', 'processing', 'payment-pending', 'payment-failed', 'hold',
    'processing-completed', 'cancelled', 'deleted',
    'out-for-delivery', 'delievered'],
    orderTypes: ['retail', 'whole'],
    modesOfPurchase: ['walkin', 'online'],
    modesOdPayment: ['cash', 'card', 'upi', 'net-banking', 'cheque', 'demand-draft', 'wallet']
}
