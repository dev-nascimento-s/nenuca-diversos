import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';

const Payment = () => {
    const { savePaymentMethod } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('Kuanza');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Método de Pagamento</h1>
            <form onSubmit={submitHandler} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                     <div className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            id="Kuanza"
                            name="paymentMethod"
                            value="Kuanza"
                            checked={paymentMethod === 'Kuanza'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-4 w-4 text-black focus:ring-black"
                        />
                        <label htmlFor="Kuanza" className="font-medium">Transferêcia Bancária (Kuanza)</label>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Continuar
                </Button>
            </form>
        </div>
    );
};

export default Payment;
