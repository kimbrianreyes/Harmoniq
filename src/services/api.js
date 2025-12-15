const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
const BASE_URL = 'https://spotify-scraper-api.p.rapidapi.com/api/v1';

const headers = {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
};

// Helper function to handle requests
const fetchFromApi = async (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        console.log('Fetching:', url.toString());
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Response for', endpoint, ':', data);
        return data;
    } catch (error) {
        console.error('Fetch error for', endpoint, ':', error);
        throw error;
    }
};

// Known working artist IDs for demo content
const FEATURED_ARTISTS = {
    eminem: '7dGJo4pcD2V6oG8kP0tJRR',
    drake: '3TVXtAsR1Inumwj472S9r4',
    taylorSwift: '06HL4z0CvFAxyc27GXpf02',
    theWeeknd: '1Xyo4u8uXC1ZmMpatF05PJ',
    edSheeran: '6eUKZXaKkcviH0Ku9w2n3V',
};

export const api = {
    // Artist Endpoints - These work!
    getArtistOverview: (artistId) => fetchFromApi('/artist/overview', { artist_id: artistId }),
    getArtistSingles: (artistId) => fetchFromApi('/artist/singles', { artist_id: artistId }),
    getArtistAlbums: (artistId) => fetchFromApi('/artist/albums', { artist_id: artistId }),
    getArtistTopTracks: (artistId) => fetchFromApi('/artist/top/tracks', { artist_id: artistId }),
    getArtistRelatedArtists: (artistId) => fetchFromApi('/artist/related/artists', { artist_id: artistId }),

    // Track/Song Endpoints
    getTrackMetadata: (trackId) => fetchFromApi('/track/metadata', { track_id: trackId }),
    getTrackLyrics: (trackId) => fetchFromApi('/track/lyrics', { track_id: trackId }),

    // Playlist Endpoints
    getPlaylistContents: (playlistId) => fetchFromApi('/playlist/contents', { playlist_id: playlistId }),

    // Album Endpoints
    getAlbumMetadata: (albumId) => fetchFromApi('/album/metadata', { album_id: albumId }),
    getAlbumTracks: (albumId) => fetchFromApi('/album/tracks', { album_id: albumId }),

    // Home Feed - uses working artist endpoints
    getHomeFeed: async () => {
        const results = {
            featuredArtist: null,
            newReleases: [],
            popularAlbums: [],
            relatedArtists: []
        };

        try {
            // Get Eminem's singles as "New Releases"
            const singles = await fetchFromApi('/artist/singles', { artist_id: FEATURED_ARTISTS.eminem });
            if (singles && singles.albums && singles.albums.items) {
                results.newReleases = singles.albums.items.slice(0, 5);
            }

            // Get artist overview
            const artistOverview = await fetchFromApi('/artist/overview', { artist_id: FEATURED_ARTISTS.eminem });
            if (artistOverview) {
                results.featuredArtist = artistOverview;
            }

            // Get albums from The Weeknd
            const albums = await fetchFromApi('/artist/albums', { artist_id: FEATURED_ARTISTS.theWeeknd });
            if (albums && albums.albums && albums.albums.items) {
                results.popularAlbums = albums.albums.items.slice(0, 5);
            }

            // Get related artists
            const related = await fetchFromApi('/artist/related/artists', { artist_id: FEATURED_ARTISTS.eminem });
            if (related && related.artists) {
                results.relatedArtists = related.artists.slice(0, 5);
            }

        } catch (error) {
            console.error('Error fetching home feed:', error);
        }

        return results;
    },

    // Search - try the chart endpoint instead
    getChartTracks: () => fetchFromApi('/chart/tracks/top'),

    // Featured artists for fallback
    FEATURED_ARTISTS,
};
