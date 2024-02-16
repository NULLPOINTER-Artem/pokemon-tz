import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonPage from './pages/PokemonPage';

export default function App() {
  return (
    <BrowserRouter basename='/pokemon-tz'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
