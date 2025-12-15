import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { api } from '../services/api';
import MediaCard from '../components/ui/MediaCard';
import Section from '../components/ui/Section';

const Search = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);

    // Predefined artist searches (since search endpoint doesn't work)
    const artistOptions = [
        { name: 'Eminem', id: api.FEATURED_ARTISTS.eminem },
        { name: 'Drake', id: api.FEATURED_ARTISTS.drake },
        { name: 'Taylor Swift', id: api.FEATURED_ARTISTS.taylorSwift },
        { name: 'The Weeknd', id: api.FEATURED_ARTISTS.theWeeknd },
        { name: 'Ed Sheeran', id: api.FEATURED_ARTISTS.edSheeran },
    ];

    const handleArtistClick = async (artistId, artistName) => {
        setLoading(true);
        setError(null);
        try {
            const [overview, singles, albums] = await Promise.all([
                api.getArtistOverview(artistId),
                api.getArtistSingles(artistId),
                api.getArtistAlbums(artistId),
            ]);

            setArtistData({
                overview,
                singles: singles?.albums?.items || [],
                albums: albums?.albums?.items || [],
                name: artistName
            });
        } catch (err) {
            console.error('Error fetching artist:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (type, id) => {
        if (id) {
            navigate(`/${type}s/${id}`);
        }
    };

    const clearResults = () => {
        setArtistData(null);
        setError(null);
    };

    // Transform API data
    const transformItems = (items, type = 'album') => {
        if (!items) return [];
        return items.map(item => ({
            id: item.id,
            title: item.name,
            subtitle: item.releaseDate?.substring(0, 4) || type,
            image: item.coverArt?.sources?.[0]?.url || item.images?.[0]?.url || `https://placehold.co/400?text=${type}`,
            type
        }));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Search</h1>
                <p className="text-gray-400">Browse music by selecting an artist below</p>
            </div>

            {/* Artist Selection Grid */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Popular Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {artistOptions.map((artist) => (
                        <button
                            key={artist.id}
                            onClick={() => handleArtistClick(artist.id, artist.name)}
                            className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all cursor-pointer text-center group"
                        >
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                                {artist.name.charAt(0)}
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                {artist.name}
                            </h3>
                        </button>
                    ))}
                </div>
            </div>

            {/* Genre Categories */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Browse by Genre</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Hip-Hop', color: 'from-orange-500 to-amber-500' },
                        { name: 'Pop', color: 'from-pink-500 to-rose-500' },
                        { name: 'Rock', color: 'from-red-500 to-orange-500' },
                        { name: 'R&B', color: 'from-purple-500 to-violet-500' },
                        { name: 'Electronic', color: 'from-cyan-500 to-blue-500' },
                        { name: 'Jazz', color: 'from-amber-500 to-yellow-500' },
                        { name: 'Classical', color: 'from-stone-500 to-zinc-600' },
                        { name: 'Indie', color: 'from-green-500 to-emerald-500' },
                    ].map((genre, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-xl p-6 h-28 bg-gradient-to-br ${genre.color} cursor-pointer hover:scale-105 transition-transform`}
                        >
                            <h3 className="text-xl font-bold text-white">{genre.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="loading loading-bars loading-lg text-primary"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-8">
                    <p className="text-red-500 mb-2">Failed to load artist: {error}</p>
                    <button onClick={clearResults} className="btn btn-ghost btn-sm">Clear</button>
                </div>
            )}

            {/* Artist Results */}
            {artistData && !loading && (
                <div className="space-y-8 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Results for {artistData.name}</h2>
                        <button onClick={clearResults} className="btn btn-ghost btn-sm">
                            <X className="w-4 h-4 mr-1" /> Clear
                        </button>
                    </div>

                    {/* View Artist Button */}
                    <button
                        onClick={() => handleCardClick('artist', artistOptions.find(a => a.name === artistData.name)?.id)}
                        className="btn btn-primary"
                    >
                        View {artistData.name}'s Profile
                    </button>

                    {/* Singles */}
                    {artistData.singles.length > 0 && (
                        <Section title={`${artistData.name}'s Singles`}>
                            {transformItems(artistData.singles, 'album').slice(0, 5).map((item, idx) => (
                                <MediaCard
                                    key={`${item.id}-${idx}`}
                                    {...item}
                                    onClick={() => handleCardClick('album', item.id)}
                                />
                            ))}
                        </Section>
                    )}

                    {/* Albums */}
                    {artistData.albums.length > 0 && (
                        <Section title={`${artistData.name}'s Albums`}>
                            {transformItems(artistData.albums, 'album').slice(0, 5).map((item, idx) => (
                                <MediaCard
                                    key={`${item.id}-${idx}`}
                                    {...item}
                                    onClick={() => handleCardClick('album', item.id)}
                                />
                            ))}
                        </Section>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
