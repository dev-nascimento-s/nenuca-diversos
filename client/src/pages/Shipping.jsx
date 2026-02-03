import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Shipping = () => {
    const { saveShippingAddress } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/payment');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Endereço de Entrega</h1>
            <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <Input
                        type="text"
                        placeholder="Rua, Número, Bairro"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                    <Input
                        type="text"
                        placeholder="Luanda"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal (Opcional)</label>
                    <Input
                        type="text"
                        placeholder=""
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                    <Input
                        type="text"
                        placeholder="Angola"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Continuar
                </Button>
            </form>
        </div>
    );
};

export default Shipping;
