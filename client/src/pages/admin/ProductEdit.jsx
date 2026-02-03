import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProductEdit = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setName(data.name);
            setPrice(data.price);
            setImage(data.image);
            setCategory(data.category);
            setCountInStock(data.countInStock);
            setDescription(data.description);
        };
        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/api/products/${id}`,
                {
                    name,
                    price,
                    description,
                    image,
                    category,
                    countInStock,
                },
                {
                     headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            navigate('/admin/productlist');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
             <Link to="/admin/productlist" className="btn btn-light my-3">
                Voltar
            </Link>
            <h1 className="text-3xl font-bold mb-6">Editar Produto</h1>
            <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
                <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Preço</label>
                    <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Imagem URL</label>
                    <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Estoque</label>
                    <Input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea 
                        className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                        rows="4"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <Button type="submit">Atualizar</Button>
            </form>
        </div>
    );
};

export default ProductEdit;
