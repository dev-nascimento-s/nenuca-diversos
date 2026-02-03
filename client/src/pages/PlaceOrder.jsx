import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const PlaceOrder = () => {
    const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100000 ? 0 : 5000; // Free shipping > 100k
    const taxPrice = Number((0.14 * itemsPrice).toFixed(2)); // 14% IVA
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, shippingAddress, paymentMethod]);

    const placeOrderHandler = async () => {
        try {
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            clearCart();
            navigate(`/order/${data._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Confirmar Pedido</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Entrega</h2>
                        <p className="mb-1"><span className="font-medium">Endereço:</span> {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pagamento</h2>
                        <p><span className="font-medium">Método:</span> {paymentMethod}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Itens</h2>
                        {cartItems.length === 0 ? (
                            <p>Seu carrinho está vazio</p>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                                            <Link to={`/product/${item.product}`} className="hover:underline text-gray-900">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600">
                                            {item.qty} x Kz {item.price.toLocaleString('pt-AO')} = Kz {(item.qty * item.price).toLocaleString('pt-AO')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    <div className="space-y-2 border-b pb-4 mb-4">
                        <div className="flex justify-between">
                            <span>Itens</span>
                            <span>Kz {itemsPrice.toLocaleString('pt-AO')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Entrega</span>
                            <span>Kz {shippingPrice.toLocaleString('pt-AO')}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Imposto (IVA 14%)</span>
                            <span>Kz {taxPrice.toLocaleString('pt-AO')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Total</span>
                        <span>Kz {Number(totalPrice).toLocaleString('pt-AO')}</span>
                    </div>

                    <Button 
                        className="w-full" 
                        size="lg" 
                        onClick={placeOrderHandler}
                        disabled={cartItems.length === 0}
                    >
                        Finalizar Pedido
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
