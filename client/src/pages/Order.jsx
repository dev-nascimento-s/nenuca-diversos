import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Order = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrder();
        }
    }, [id, user]);

    if (loading) return (
         <div className="flex justify-center items-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
       </div>
    );

    if (!order) return <div>Pedido não encontrado</div>;

    return (
        <div className="max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Pedido {order._id}</h1>
             </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Entrega</h2>
                        <p className="mb-1"><span className="font-medium">Nome:</span> {order.user.name}</p>
                        <p className="mb-1"><span className="font-medium">Email:</span> {order.user.email}</p>
                        <p className="mb-4"><span className="font-medium">Endereço:</span> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-800 p-2 rounded">Entregue em {order.deliveredAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-yellow-100 text-yellow-800 p-2 rounded">Não Entregue</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pagamento</h2>
                        <p className="mb-4"><span className="font-medium">Método:</span> {order.paymentMethod}</p>
                        
                        {order.paymentMethod === 'Kuanza' && !order.isPaid && (
                             <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-4 rounded border">
                                <p className="font-bold">Instruções para Transferência Bancária:</p>
                                <p>Banco: BAI</p>
                                <p>IBAN: AO06 0000 0000 0000 0000 0</p>
                                <p>Titular: NenuCa Diversos</p>
                                <p className="mt-2">Envie o comprovativo para pagamentos@nenucadiversos.com com o ID do pedido.</p>
                            </div>
                        )}

                        {order.isPaid ? (
                             <div className="bg-green-100 text-green-800 p-2 rounded">Pago em {order.paidAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-2 rounded">Não Pago</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Itens</h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item, index) => (
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
                    </div>
                </div>

                 <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    <div className="space-y-2 border-b pb-4 mb-4">
                        <div className="flex justify-between">
                            <span>Itens</span>
                            <span>Kz {order.itemsPrice.toLocaleString('pt-AO')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Entrega</span>
                            <span>Kz {order.shippingPrice.toLocaleString('pt-AO')}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Imposto</span>
                            <span>Kz {order.taxPrice.toLocaleString('pt-AO')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Total</span>
                        <span>Kz {order.totalPrice.toLocaleString('pt-AO')}</span>
                    </div>
                    {/* Placeholder for PayPal/Stripe Buttons */}
                </div>
            </div>
        </div>
    );
};

export default Order;
