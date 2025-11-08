/**
 * App.jsx
 * Hauptseite der Heap-Präsentation: orchestriert Inhalte und Visualisierungen.
 */
import { useCallback, useState } from 'react';
import Header from './components/Header';
import IntroHeaps from './components/IntroHeaps';
import HeapsortExplanation from './components/HeapsortExplanation';
import HeapsortVisualizer from './components/HeapsortVisualizer';
import SortController from './components/SortController';
import RuntimeAnalysis from './components/RuntimeAnalysis';
import UseCases from './components/UseCases';

const generateRandomArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const App = () => {
  const [arraySize, setArraySize] = useState(12);
  const [numbers, setNumbers] = useState(() => generateRandomArray(12));
  const [lengthInput, setLengthInput] = useState('12');
  const [slowMode, setSlowMode] = useState(false);
  const [controlSignal, setControlSignal] = useState({ type: 'idle', id: 0 });
  const [visualStatus, setVisualStatus] = useState('idle');

  const triggerControl = useCallback((type) => {
    setControlSignal({ type, id: Date.now() });
  }, []);

  const handleLengthInputChange = useCallback((value) => {
    setLengthInput(value);
  }, []);

  const handleGenerateFromLength = useCallback(() => {
    const parsed = parseInt(lengthInput, 10);
    const sanitized = Number.isFinite(parsed) ? Math.min(40, Math.max(5, parsed)) : 10;
    setArraySize(sanitized);
    setLengthInput(String(sanitized));
    setNumbers(generateRandomArray(sanitized));
    triggerControl('reset');
  }, [lengthInput, triggerControl]);

  return (
    <>
      <Header />
      <main className="hp-main">
        <IntroHeaps />
        <HeapsortExplanation />
        <section id="visualizer" className="hp-section hp-section--visual">
          <div className="hp-section__content">
            <h2>Interaktive Heapsort-Demo</h2>
            <p>
              Mit den Schaltflächen kannst du die Sortierung starten, pausieren
              oder Schritt für Schritt verfolgen. Die Balken zeigen das Array,
              darunter siehst du den Heap als Baumstruktur.
            </p>
          </div>
          <div className="hp-visualizer-layout">
            <HeapsortVisualizer
              inputArray={numbers}
              controlSignal={controlSignal}
              slowMode={slowMode}
              onStatusChange={setVisualStatus}
            />
            <SortController
              onStart={() => triggerControl('start')}
              onPause={() => triggerControl('pause')}
              onStep={() => triggerControl('step')}
              onReset={() => triggerControl('reset')}
              onGenerate={handleGenerateFromLength}
              lengthInput={lengthInput}
              onLengthInputChange={handleLengthInputChange}
              arraySize={arraySize}
              slowMode={slowMode}
              onSlowModeChange={setSlowMode}
              playState={visualStatus}
            />
          </div>
        </section>
        <RuntimeAnalysis />
        <UseCases />
      </main>
    </>
  );
};

export default App;
