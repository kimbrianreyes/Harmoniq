import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Discover from './pages/Discover';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Discover />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />

          {/* Dynamic Routes */}
          <Route path="/artists/:id" element={<Details type="Artist" />} />
          <Route path="/albums/:id" element={<Details type="Album" />} />
          <Route path="/playlists/:id" element={<Details type="Playlist" />} />
          <Route path="/podcasts/:id" element={<Details type="Podcast" />} />
          <Route path="/audiobooks/:id" element={<Details type="Audiobook" />} />
          <Route path="/genres/:id" element={<Details type="Genre" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
