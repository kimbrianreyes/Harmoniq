import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Play, Clock, Heart, MoreHorizontal, Users, Disc, Music, ArrowLeft } from 'lucide-react';

const Details = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                switch (type) {
                    case 'Artist':
                        const artistData = await api.getArtistOverview(id);
                        console.log('Artist data:', artistData);
                        setData(artistData);

                        // Fetch artist's top tracks
                        try {
                            const topTracks = await api.getArtistTopTracks(id);
                            console.log('Top tracks:', topTracks);
                            if (topTracks && topTracks.tracks) {
                                setTracks(topTracks.tracks.slice(0, 10));
                            }
                        } catch (e) {
                            console.log('Could not fetch top tracks:', e);
                        }

                        // Fetch artist's albums
                        try {
                            const artistAlbums = await api.getArtistAlbums(id);
                            console.log('Artist albums:', artistAlbums);
                            if (artistAlbums && artistAlbums.albums && artistAlbums.albums.items) {
                                setAlbums(artistAlbums.albums.items.slice(0, 6));
                            }
                        } catch (e) {
                            console.log('Could not fetch albums:', e);
                        }
                        break;

                    case 'Album':
                        const albumData = await api.getAlbumMetadata(id);
                        console.log('Album data:', albumData);
                        setData(albumData);

                        // Fetch album tracks
                        try {
                            const albumTracks = await api.getAlbumTracks(id);
                            console.log('Album tracks:', albumTracks);
                            if (albumTracks && albumTracks.tracks && albumTracks.tracks.items) {
                                setTracks(albumTracks.tracks.items);
                            } else if (albumTracks && albumTracks.items) {
                                setTracks(albumTracks.items);
                            }
                        } catch (e) {
                            console.log('Could not fetch album tracks:', e);
                        }
                        break;

                    case 'Playlist':
                        const playlistData = await api.getPlaylistContents(id);
                        console.log('Playlist data:', playlistData);
                        setData(playlistData);
                        if (playlistData && playlistData.tracks && playlistData.tracks.items) {
                            setTracks(playlistData.tracks.items.map(item => item.track).filter(Boolean));
                        }
                        break;

                    default:
                        setData({ name: `${type} Details`, description: `Viewing ${type} with ID: ${id}` });
                }
            } catch (err) {
                console.error(`Error fetching ${type} details:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id, type]);

    const formatDuration = (ms) => {
        if (!ms) return '--:--';
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="loading loading-bars loading-lg text-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Error Loading {type}</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button onClick={() => navigate(-1)} className="btn btn-ghost">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Extract display info based on API response structure
    const displayName = data?.name || data?.profile?.name || 'Unknown';
    const displayImage =
        data?.visuals?.avatarImage?.sources?.[0]?.url ||
        data?.visuals?.headerImage?.sources?.[0]?.url ||
        data?.coverArt?.sources?.[0]?.url ||
        data?.images?.[0]?.url ||
        'https://placehold.co/400?text=' + type;
    const displayDescription = data?.profile?.biography?.text || data?.description || '';
    const followerCount = data?.stats?.followers;
    const monthlyListeners = data?.stats?.monthlyListeners;

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-primary/20 to-transparent -mx-6 p-8 pb-12">
                <div className={`w-48 h-48 md:w-56 md:h-56 shadow-2xl overflow-hidden flex-shrink-0 ${type === 'Artist' ? 'rounded-full' : 'rounded-lg'}`}>
                    <img
                        src={displayImage}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/400?text=' + type; }}
                    />
                </div>
                <div className="text-center md:text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{type}</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white my-2">{displayName}</h1>
                    {displayDescription && (
                        <p className="text-gray-400 line-clamp-2 max-w-2xl" dangerouslySetInnerHTML={{ __html: displayDescription }}></p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400 flex-wrap justify-center md:justify-start">
                        {monthlyListeners && (
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{monthlyListeners.toLocaleString()} monthly listeners</span>
                            </div>
                        )}
                        {followerCount && (
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>{followerCount.toLocaleString()} followers</span>
                            </div>
                        )}
                        {tracks.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Music className="w-4 h-4" />
                                <span>{tracks.length} tracks</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button className="btn btn-circle btn-lg bg-primary border-none hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                </button>
                <button className="btn btn-circle btn-ghost text-gray-400 hover:text-white">
                    <Heart className="w-6 h-6" />
                </button>
                <button className="btn btn-circle btn-ghost text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            {/* Track List */}
            {tracks.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {type === 'Artist' ? 'Top Tracks' : 'Tracks'}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase border-b border-white/5">
                                    <th className="w-12">#</th>
                                    <th>Title</th>
                                    <th className="hidden md:table-cell">Album</th>
                                    <th className="text-right"><Clock className="w-4 h-4 inline" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((track, index) => (
                                    <tr
                                        key={track.id || track.uid || index}
                                        className="group hover:bg-white/5 cursor-pointer border-b border-white/5"
                                    >
                                        <td className="text-gray-400 group-hover:text-primary">{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {(track.album?.coverArt?.sources?.[0]?.url || track.album?.images?.[0]?.url) && (
                                                    <img
                                                        src={track.album?.coverArt?.sources?.[0]?.url || track.album?.images?.[0]?.url}
                                                        alt={track.name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                                                        {track.name || 'Unknown Track'}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {track.artists?.items?.map(a => a.profile?.name).join(', ') ||
                                                            track.artists?.map(a => a.name).join(', ') ||
                                                            'Unknown Artist'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell text-gray-400 text-sm">
                                            {track.album?.name || '-'}
                                        </td>
                                        <td className="text-right text-gray-400 text-sm">
                                            {formatDuration(track.duration?.totalMilliseconds || track.duration_ms)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Albums Section (for Artist pages) */}
            {type === 'Artist' && albums.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-white mb-4">Discography</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {albums.map((album, index) => (
                            <div
                                key={album.id || index}
                                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                onClick={() => navigate(`/albums/${album.id}`)}
                            >
                                <img
                                    src={album.coverArt?.sources?.[0]?.url || 'https://placehold.co/200?text=Album'}
                                    alt={album.name}
                                    className="w-full aspect-square object-cover rounded-lg mb-3"
                                />
                                <h3 className="font-medium text-white text-sm truncate group-hover:text-primary transition-colors">
                                    {album.name}
                                </h3>
                                <p className="text-xs text-gray-400">{album.releaseDate?.substring(0, 4)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {tracks.length === 0 && albums.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <Disc className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No additional content available for this {type.toLowerCase()}.</p>
                </div>
            )}
        </div>
    );
};

export default Details;
