import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                    NenuCa Diversos
                </Link>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative">
                           <div className="flex items-center gap-2">
                                <span className="text-sm font-medium mr-2 hidden md:block">olá, {user.name}</span>
                                <Button onClick={handleLogout} variant="ghost" size="sm">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sair
                                </Button>
                               {user.isAdmin && (
                                   <Link to="/admin/dashboard">
                                       <Button variant="outline" size="sm">Admin</Button>
                                   </Link>
                               )}
                           </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Entrar</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Cadastrar</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
