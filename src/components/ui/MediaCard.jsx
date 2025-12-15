import React from 'react';
import { Play } from 'lucide-react';
import { cn } from '../../lib/utils'; // Adjust path if needed or use absolute imports if configured

const MediaCard = ({ title, subtitle, image, type = 'standard', onClick }) => {
    const isArtist = type === 'artist';

    return (
        <div
            className="group relative p-4 bg-base-100/40 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border border-transparent hover:border-white/5"
            onClick={onClick}
        >
            <div className={cn(
                "relative mb-4 aspect-square shadow-lg overflow-hidden",
                isArtist ? "rounded-full" : "rounded-md"
            )}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {!isArtist && (
                    <div className="absolute right-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-10">
                        <button className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all">
                            <Play className="w-6 h-6 fill-black ml-1" />
                        </button>
                    </div>
                )}
            </div>

            <div className="min-h-[60px]">
                <h3 className="font-bold text-white truncate mb-1" title={title}>{title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{subtitle}</p>
            </div>
        </div>
    );
};

export default MediaCard;
