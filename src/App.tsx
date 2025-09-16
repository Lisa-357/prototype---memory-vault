import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';
import CreateCapsule from './pages/CreateCapsule';
import CapsuleDetail from './pages/CapsuleDetail';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<Gallery />} />
        <Route path="settings" element={<Settings />} />
        <Route path="create" element={<CreateCapsule />} />
        <Route path="capsule/:id" element={<CapsuleDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;