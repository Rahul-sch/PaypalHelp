import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import {
  Dashboard,
  PythonCourse,
  PatternMaster,
  ProblemBank,
  VerbalTrainer,
  AndroidReference,
  BattlePlan,
  Achievements,
  SpeedRun,
} from './pages';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="python" element={<PythonCourse />} />
          <Route path="patterns" element={<PatternMaster />} />
          <Route path="problems" element={<ProblemBank />} />
          <Route path="verbal" element={<VerbalTrainer />} />
          <Route path="android" element={<AndroidReference />} />
          <Route path="battleplan" element={<BattlePlan />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="speed" element={<SpeedRun />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
