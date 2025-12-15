import React from 'react';
import { Heart, Music, Clock } from 'lucide-react';

const Profile = () => {
    // Mock user data
    const user = {
        name: 'Guest User',
        avatar: null,
        initials: 'GU',
        playlists: 0,
        followers: 0,
        following: 0,
    };

    // Mock listening history
    const recentlyPlayed = [
        { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
        { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: '3:53' },
        { id: 3, title: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming', duration: '3:29' },
        { id: 4, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54' },
        { id: 5, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23' },
    ];

    const likedSongs = [
        { id: 1, title: 'Anti-Hero', artist: 'Taylor Swift' },
        { id: 2, title: 'As It Was', artist: 'Harry Styles' },
        { id: 3, title: 'Bad Habit', artist: 'Steve Lacy' },
    ];

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-secondary/30 to-transparent -mx-6 -mt-6 p-8 pb-12">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-40 h-40 rounded-full shadow-2xl object-cover"
                    />
                ) : (
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl font-bold text-white shadow-2xl">
                        {user.initials}
                    </div>
                )}
                <div className="text-center md:text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Profile</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white my-2">{user.name}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mt-2">
                        <span><strong className="text-white">{user.playlists}</strong> Playlists</span>
                        <span>•</span>
                        <span><strong className="text-white">{user.followers}</strong> Followers</span>
                        <span>•</span>
                        <span><strong className="text-white">{user.following}</strong> Following</span>
                    </div>
                </div>
            </div>

            {/* Liked Songs Section */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-accent" />
                    Liked Songs
                </h2>
                {likedSongs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {likedSongs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center">
                                    <Music className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white truncate group-hover:text-primary transition-colors">
                                        {song.title}
                                    </p>
                                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                                </div>
                                <Heart className="w-5 h-5 text-accent fill-accent" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No liked songs yet.</p>
                )}
            </div>

            {/* Recently Played Section */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Recently Played
                </h2>
                {recentlyPlayed.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase border-b border-white/5">
                                    <th className="w-12">#</th>
                                    <th>Title</th>
                                    <th className="hidden md:table-cell">Album</th>
                                    <th className="text-right">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentlyPlayed.map((track, index) => (
                                    <tr
                                        key={track.id}
                                        className="group hover:bg-white/5 cursor-pointer border-b border-white/5"
                                    >
                                        <td className="text-gray-400">{index + 1}</td>
                                        <td>
                                            <div>
                                                <p className="font-medium text-white group-hover:text-primary transition-colors">
                                                    {track.title}
                                                </p>
                                                <p className="text-sm text-gray-400">{track.artist}</p>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell text-gray-400 text-sm">{track.album}</td>
                                        <td className="text-right text-gray-400 text-sm">{track.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No recently played tracks.</p>
                )}
            </div>

            {/* Settings/Account Info */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Account Type</span>
                        <span className="text-white">Free</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">guest@harmoniq.app</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-white">December 2024</span>
                    </div>
                </div>
                <button className="btn btn-primary btn-sm mt-6">Upgrade to Premium</button>
            </div>
        </div>
    );
};

export default Profile;
