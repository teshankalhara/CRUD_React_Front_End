import ProductType from "./ProductType";

interface OrderType {
    id: number,
    totalPrice: number,
    orderDateTime: Date,
    orderedProduct: ProductType[]
}

export default OrderType