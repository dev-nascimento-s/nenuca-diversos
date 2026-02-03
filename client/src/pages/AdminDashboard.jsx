import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Painel do Administrador</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Link to="/admin/productlist" className="block">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Gerenciar Produtos</h2>
                        <p className="text-gray-500">Adicionar, editar e remover produtos da loja.</p>
                        <Button className="mt-4" variant="outline">Acessar</Button>
                    </div>
                </Link>
                <Link to="/admin/orderlist" className="block">
                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Gerenciar Pedidos</h2>
                        <p className="text-gray-500">Visualizar e atualizar status dos pedidos.</p>
                        <Button className="mt-4" variant="outline">Acessar</Button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
