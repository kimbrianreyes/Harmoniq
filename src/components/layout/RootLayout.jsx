import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';

const RootLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-base-100 text-white overflow-hidden font-sans selection:bg-primary selection:text-white">
            <div className="flex flex-1 overflow-hidden relative">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

                <Sidebar />

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                    <Navbar />
                    <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <div className="max-w-7xl mx-auto w-full pb-24">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default RootLayout;
