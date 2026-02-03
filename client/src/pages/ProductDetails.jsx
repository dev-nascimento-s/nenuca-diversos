import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, Number(qty));
        navigate('/cart');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
       </div>
    );

    if (!product) return <div>Produto não encontrado</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</p>
                    <div className="text-3xl font-bold text-gray-900">Kz {product.price.toLocaleString('pt-AO')}</div>
                    
                    <div className="prose prose-sm text-gray-600">
                        <p>{product.description}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <label className="text-sm font-medium text-gray-700">Quantidade:</label>
                            <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="border border-gray-300 rounded-md text-gray-700 h-10 pl-3 pr-8 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                {[...Array(product.countInStock || 0).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button 
                            className="w-full md:w-auto px-8" 
                            size="lg"
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0}
                        >
                            {product.countInStock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
