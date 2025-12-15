import React from 'react';
import { ChevronLeft, ChevronRight, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-base-100/40 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
