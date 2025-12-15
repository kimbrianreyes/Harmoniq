import React, { useEffect, useState } from 'react';
import Section from '../components/ui/Section';
import MediaCard from '../components/ui/MediaCard';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Discover = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        newReleases: [],
        popularAlbums: [],
        relatedArtists: [],
        featuredArtist: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await api.getHomeFeed();
                console.log('Home feed result:', result);
                setData(result);
            } catch (err) {
                console.error("Error fetching discover data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (type, id) => {
        if (id) {
            navigate(`/${type}s/${id}`);
        }
    };

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Transform API data to MediaCard format
    const transformSingles = (items) => {
        if (!items) return [];
        return items.map(item => ({
            id: item.id,
            title: item.name,
            subtitle: item.releaseDate?.substring(0, 4) || 'Single',
            image: item.coverArt?.sources?.[0]?.url || item.images?.[0]?.url || 'https://placehold.co/400?text=Album',
            type: 'album'
        }));
    };

    const transformAlbums = (items) => {
        if (!items) return [];
        return items.map(item => ({
            id: item.id,
            title: item.name,
            subtitle: item.releaseDate?.substring(0, 4) || 'Album',
            image: item.coverArt?.sources?.[0]?.url || item.images?.[0]?.url || 'https://placehold.co/400?text=Album',
            type: 'album'
        }));
    };

    const transformArtists = (items) => {
        if (!items) return [];
        return items.map(item => ({
            id: item.id,
            title: item.name,
            subtitle: 'Artist',
            image: item.visuals?.avatarImage?.sources?.[0]?.url || item.images?.[0]?.url || 'https://placehold.co/400?text=Artist',
            type: 'artist'
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="loading loading-bars loading-lg text-primary"></div>
                    <p className="text-gray-400">Loading your music...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Error Loading Content</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const newReleases = transformSingles(data.newReleases);
    const popularAlbums = transformAlbums(data.popularAlbums);
    const relatedArtists = transformArtists(data.relatedArtists);

    const hasData = newReleases.length > 0 || popularAlbums.length > 0 || relatedArtists.length > 0;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-6">{getGreeting()}</h1>

            {/* Featured Artist Banner */}
            {data.featuredArtist && (
                <div
                    className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/30 to-secondary/30 p-8 mb-8 cursor-pointer group"
                    onClick={() => handleCardClick('artist', api.FEATURED_ARTISTS.eminem)}
                >
                    <div className="flex items-center gap-6">
                        {data.featuredArtist.visuals?.avatarImage?.sources?.[0]?.url && (
                            <img
                                src={data.featuredArtist.visuals.avatarImage.sources[0].url}
                                alt={data.featuredArtist.name}
                                className="w-32 h-32 rounded-full object-cover shadow-2xl group-hover:scale-105 transition-transform"
                            />
                        )}
                        <div>
                            <span className="text-xs uppercase tracking-wider text-primary font-semibold">Featured Artist</span>
                            <h2 className="text-3xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                                {data.featuredArtist.name}
                            </h2>
                            <p className="text-gray-400 mt-2 line-clamp-2 max-w-xl">
                                {data.featuredArtist.stats?.monthlyListeners?.toLocaleString()} monthly listeners
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!hasData ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No content available. Check the browser console for API response details.</p>
                </div>
            ) : (
                <>
                    {newReleases.length > 0 && (
                        <Section title="New Releases" action="See all">
                            {newReleases.map((item, idx) => (
                                <MediaCard key={`${item.id}-${idx}`} {...item} onClick={() => handleCardClick('album', item.id)} />
                            ))}
                        </Section>
                    )}

                    {popularAlbums.length > 0 && (
                        <Section title="Popular Albums" action="See all">
                            {popularAlbums.map((item, idx) => (
                                <MediaCard key={`${item.id}-${idx}`} {...item} onClick={() => handleCardClick('album', item.id)} />
                            ))}
                        </Section>
                    )}

                    {relatedArtists.length > 0 && (
                        <Section title="Artists You Might Like" action="See all">
                            {relatedArtists.map((item, idx) => (
                                <MediaCard key={`${item.id}-${idx}`} {...item} type="artist" onClick={() => handleCardClick('artist', item.id)} />
                            ))}
                        </Section>
                    )}
                </>
            )}
        </div>
    );
};

export default Discover;
