/**
 * HeapsortVisualizer.jsx
 * Interaktive Visualisierung des Heapsort-Prozesses inklusive Animationen.
 *
 * Die Komponente reagiert auf Steuerbefehle vom SortController. Ãœber ein
 * einfaches Command-Pattern (controlSignal) werden Start/Pause/Step/Reset
 * ausgelÃ¶st. Die eigentliche Heapsort-Logik wird in einzelne "Steps"
 * Ã¼bersetzt, die nacheinander animiert werden.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HeapTree from './HeapTree';

const buildHeapsortSteps = (input) => {
  // Wir erzeugen eine Kopie, damit das Originalarray unangetastet bleibt.
  const arr = [...input];
  const steps = [];

  const recordCompare = (a, b) => {
    steps.push({ type: 'compare', indices: [a, b] });
  };

  const recordSwap = (a, b) => {
    steps.push({ type: 'swap', indices: [a, b] });
  };

  const recordSorted = (indices) => {
    const payload = Array.isArray(indices) ? indices : [indices];
    if (!payload.length) return;
    steps.push({ type: 'sorted', indices: payload });
  };

  const heapify = (size, root) => {
    let largest = root;
    const left = 2 * root + 1;
    const right = left + 1;

    if (left < size) {
      recordCompare(left, largest);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      recordCompare(right, largest);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      recordSwap(root, largest);
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  };

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
    heapify(arr.length, i);
  }
  steps.push({ type: 'info', message: 'Max-Heap aufgebaut' });

  for (let end = arr.length - 1; end > 0; end -= 1) {
    recordSwap(0, end);
    [arr[0], arr[end]] = [arr[end], arr[0]];
    steps.push({
      type: 'info',
      message: `Maximum an Position ${end} fixiert`,
    });
    recordSorted(end);
    heapify(end, 0);
  }
  if (arr.length) {
    recordSorted(0);
  }
  steps.push({ type: 'info', message: 'Array sortiert.' });

  return steps;
};

const HeapsortVisualizer = ({
  inputArray = [],
  controlSignal,
  slowMode,
  onStatusChange = () => {},
}) => {
  const [bars, setBars] = useState(inputArray);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Bereit fÃ¼r Heapsort âœ¨');
  const [playState, setPlayState] = useState('idle'); // idle | playing | paused | done
  const [highlighted, setHighlighted] = useState({ compare: [], swap: [] });
  const [sortedIndices, setSortedIndices] = useState([]);
  const barCount = bars.length || 1;
  const barGap = useMemo(() => {
    if (barCount > 34) return '0.25rem';
    if (barCount > 26) return '0.35rem';
    return '0.5rem';
  }, [barCount]);
  const barLabelSize = useMemo(() => {
    if (barCount > 34) return '0.6rem';
    if (barCount > 26) return '0.7rem';
    return '0.85rem';
  }, [barCount]);
  const barMinWidth = useMemo(() => {
    if (barCount > 34) return '8px';
    if (barCount > 26) return '12px';
    return '16px';
  }, [barCount]);
  const barMaxWidth = useMemo(() => {
    if (barCount <= 8) return '90px';
    if (barCount <= 12) return '72px';
    if (barCount <= 18) return '60px';
    return '46px';
  }, [barCount]);

  const stepsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const controlIdRef = useRef(null);

  // Wenn sich das Eingabe-Array Ã¤ndert, setzen wir alles zurÃ¼ck und bereiten neue Steps vor.
  useEffect(() => {
    setBars(inputArray);
    const generated = buildHeapsortSteps(inputArray);
    setSteps(generated);
    stepsRef.current = generated;
    setStepIndex(0);
    stepIndexRef.current = 0;
    setHighlighted({ compare: [], swap: [] });
    setSortedIndices([]);
    setPlayState('idle');
    setStatusMessage('Bereit für Heapsort âœ¨');
    onStatusChange('Bereit');
  }, [inputArray, onStatusChange]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const advanceStep = useCallback(() => {
    const step = stepsRef.current[stepIndexRef.current];
    if (!step) {
      setPlayState('done');
      setHighlighted({ compare: [], swap: [] });
      setStatusMessage('Fertig! Alle Elemente sortiert.');
      onStatusChange('Fertig');
      return true;
    }

    if (step.type === 'compare') {
      setHighlighted({ compare: step.indices, swap: [] });
      setStatusMessage(
        `Vergleich: Index ${step.indices[0]} â†” ${step.indices[1]}`,
      );
    } else if (step.type === 'swap') {
      setHighlighted({ compare: [], swap: step.indices });
      setBars((prev) => {
        const next = [...prev];
        const [a, b] = step.indices;
        [next[a], next[b]] = [next[b], next[a]];
        return next;
      });
      setStatusMessage(
        `Tausch: Position ${step.indices[0]} â†” ${step.indices[1]}`,
      );
    } else if (step.type === 'sorted') {
      setHighlighted({ compare: [], swap: [] });
      setSortedIndices((prev) => {
        const next = new Set(prev);
        step.indices.forEach((idx) => next.add(idx));
        return Array.from(next);
      });
      if (step.indices.length === 1) {
        setStatusMessage(`Position ${step.indices[0]} fertig sortiert.`);
      } else {
        setStatusMessage(
          `Positionen ${step.indices.join(', ')} fertig sortiert.`,
        );
      }
    } else if (step.type === 'info') {
      setHighlighted({ compare: [], swap: [] });
      setStatusMessage(step.message);
    }

    setStepIndex((prev) => prev + 1);
    stepIndexRef.current += 1;
    return false;
  }, [onStatusChange]);

  useEffect(() => {
    if (!controlSignal || controlSignal.id === controlIdRef.current) return;
    controlIdRef.current = controlSignal.id;

    switch (controlSignal.type) {
      case 'start':
        setPlayState('playing');
        setStatusMessage('Animation läuft â€¦');
        onStatusChange('Läuft');
        break;
      case 'pause':
        setPlayState('paused');
        setStatusMessage('Pausiert');
        onStatusChange('Pausiert');
        break;
      case 'step':
        setPlayState('paused');
        advanceStep();
        break;
      case 'reset':
        setBars(inputArray);
        setStepIndex(0);
        stepIndexRef.current = 0;
        setHighlighted({ compare: [], swap: [] });
        setSortedIndices([]);
        setPlayState('idle');
        setStatusMessage('Zurückgesetzt');
        onStatusChange('Bereit');
        break;
      default:
        break;
    }
  }, [advanceStep, controlSignal, inputArray, onStatusChange]);

  const maxValue = useMemo(
    () => (bars.length ? Math.max(...bars) : 1),
    [bars],
  );

  const stepDelay = useMemo(() => {
    if (slowMode) return 850;
    if (bars.length >= 22) return 80;
    if (bars.length >= 16) return 150;
    if (bars.length >= 10) return 220;
    return 320;
  }, [bars.length, slowMode]);

  useEffect(() => {
    if (playState !== 'playing') return undefined;

    const timeout = setTimeout(() => {
      const finished = advanceStep();
      if (finished) {
        clearTimeout(timeout);
      }
    }, stepDelay);

    return () => clearTimeout(timeout);
  }, [advanceStep, playState, stepDelay, stepIndex]);

  return (
    <div className="hp-visualizer">
      <div className="hp-visualizer__header">
        <div>
          <h2>Heapsort Visualisierung</h2>
          <p>{statusMessage}</p>
        </div>
        <span className={`hp-pill hp-pill--${playState}`}>{playState}</span>
      </div>
      <div
        className="hp-visualizer__bars"
        aria-live="polite"
        style={{
          '--hp-bar-count': `${barCount}`,
          '--hp-bar-gap': barGap,
          '--hp-bar-label-size': barLabelSize,
          '--hp-bar-min-width': barMinWidth,
          '--hp-bar-max-width': barMaxWidth,
        }}
      >
        {bars.map((value, index) => {
          const barHeight = (value / maxValue) * 100 || 5;
          const isCompare = highlighted.compare.includes(index);
          const isSwap = highlighted.swap.includes(index);
          const isSorted = sortedIndices.includes(index);
          const barClasses = ['hp-bar'];
          if (isSorted) {
            barClasses.push('is-sorted');
          } else {
            if (isCompare) barClasses.push('is-compare');
            if (isSwap) barClasses.push('is-swap');
          }

          return (
            <div
              key={`${value}-${index}`}
              className={barClasses.join(' ')}
              style={{ height: `${Math.max(barHeight, 8)}%` }}
            >
              <span>{value}</span>
            </div>
          );
        })}
      </div>
      <div className="hp-visualizer__tree">
        <h3>Heap als Baum</h3>
        <HeapTree
          values={bars}
          highlightedNodes={{ ...highlighted, sorted: sortedIndices }}
        />
      </div>
    </div>
  );
};

export default HeapsortVisualizer;



