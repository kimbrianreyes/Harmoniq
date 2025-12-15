import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, Mic2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(70);
    const [progress, setProgress] = useState(30);

    return (
        <div className="h-24 bg-base-100/80 backdrop-blur-xl border-t border-white/5 px-6 flex items-center justify-between z-50">

            {/* Track Info */}
            <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
                <div className="w-14 h-14 rounded-lg bg-gray-800 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop')] bg-cover bg-center shadow-lg group relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-white text-sm line-clamp-1 cursor-pointer hover:underline">Midnight Vibes</h4>
                    <p className="text-xs text-gray-400 cursor-pointer hover:underline hover:text-white">Lo-Fi Dreamer</p>
                </div>
                <button className="text-gray-400 hover:text-accent transition-colors ml-2">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl px-4">
                <div className="flex items-center gap-6">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </button>
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Repeat className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span>1:23</span>
                    <div className="h-1 flex-1 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer group">
                        <div
                            className="h-full bg-white group-hover:bg-primary transition-colors relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
                        </div>
                    </div>
                    <span>3:45</span>
                </div>
            </div>

            {/* Extra Controls */}
            <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Mic2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 group">
                    <Volume2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    <div className="w-24 h-1 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer">
                        <div
                            className="h-full bg-white group-hover:bg-primary transition-colors"
                            style={{ width: `${volume}%` }}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Player;
