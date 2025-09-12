import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<Gallery />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;