import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { fetchProducts } from '../services/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        // Maybe add a toast here
    };

    if (loading) return (
       <div className="flex justify-center items-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
       </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Últimos Produtos</h1>
            
            {products.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Nenhum produto encontrado.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover object-center"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Sem+imagem'; }} 
                                />
                            </Link>
                            <div className="p-4">
                                <Link to={`/product/${product._id}`}>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1 hover:text-accent transition-colors truncate">{product.name}</h2>
                                </Link>
                                <p className="text-sm text-gray-500 mb-2 truncate">{product.category}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-bold text-gray-900">
                                        Kz {product.price.toLocaleString('pt-AO')}
                                    </span>
                                    <Button size="sm" onClick={() => handleAddToCart(product)} disabled={product.countInStock === 0}>
                                        {product.countInStock > 0 ? 'Adicionar' : 'Esgotado'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
