import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            
            const fetchMyOrders = async () => {
                try {
                    const { data } = await axios.get('/api/orders/myorders', {
                        headers: { Authorization: `Bearer ${user.token}` },
                    });
                    setOrders(data);
                    setLoadingOrders(false);
                } catch (error) {
                    console.error(error);
                    setLoadingOrders(false);
                }
            };
            fetchMyOrders();
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Update profile logic here (not implemented in backend for this MVP but easy to add)
        alert('Perfil atualizado (simulação)');
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome</label>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Senha</label>
                            <Input type="password" placeholder="Nova senha" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                            <Input type="password" placeholder="Confirme nova senha" />
                        </div>
                        <Button type="submit">Atualizar</Button>
                    </form>
                </div>

                <div className="md:col-span-3">
                    <h2 className="text-xl font-semibold mb-4">Meus Pedidos</h2>
                    {loadingOrders ? (
                         <Loader2 className="animate-spin" />
                    ) : orders.length === 0 ? (
                        <p>Você ainda não fez pedidos.</p>
                    ) : (
                         <div className="bg-white border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pago</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id.substring(0, 10)}...</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kz {order.totalPrice}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.isPaid ? (
                                                    <span className="text-green-600">Sim</span>
                                                ) : (
                                                    <span className="text-red-600">Não</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                 <Button variant="outline" size="sm" asChild>
                                                    <Link to={`/order/${order._id}`}>Ver</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
