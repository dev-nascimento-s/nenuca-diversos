import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

            {cartItems.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">Seu carrinho está vazio.</p>
                    <Link to="/">
                        <Button variant="outline">Ir as Compras</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="ml-4 flex-1">
                                    <Link to={`/product/${item.product}`} className="text-lg font-medium text-gray-900 hover:underline">
                                        {item.name}
                                    </Link>
                                    <div className="text-gray-500 text-sm">Kz {item.price.toLocaleString('pt-AO')}</div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="border border-gray-300 rounded-md h-9 text-sm"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product)}>
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span>Itens ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                            <span>Kz {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('pt-AO')}</span>
                        </div>
                        <div className="mt-6">
                            <Button className="w-full" size="lg" onClick={checkoutHandler}>
                                Finalizar Compra
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
