import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Library, Disc, Mic2, BookOpen, Music } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Discover', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: Library, label: 'Collection', path: '/profile' },
    ];

    const browseItems = [
        { icon: Music, label: 'Songs', query: 'top songs' },
        { icon: Disc, label: 'Albums', query: 'new albums' },
        { icon: Mic2, label: 'Artists', query: 'popular artists' },
        { icon: BookOpen, label: 'Podcasts', query: 'podcasts' },
    ];

    const handleBrowseClick = (query) => {
        // Navigate to search page with the query
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <aside className="w-64 hidden md:flex flex-col h-full bg-base-100/50 backdrop-blur-xl border-r border-white/5 p-4 z-20">
            <div className="flex items-center gap-2 px-4 py-6 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent animate-pulse" />
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Harmoniq
                </span>
            </div>

            <nav className="space-y-6 flex-1">
                <div className="space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-primary/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className="space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Browse</p>
                    {browseItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleBrowseClick(item.query)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <NavLink
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">K</div>
                    <div className="text-sm">
                        <p className="font-medium">Guest User</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
