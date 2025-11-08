/**
 * Header.jsx
 * Fixer Seitenkopf mit Navigation zu allen Sektionen der Präsentation.
 */
import { useMemo } from 'react';

const sections = [
  { id: 'intro', label: 'Einführung' },
  { id: 'heaps', label: 'Heap-Eigenschaften' },
  { id: 'visualizer', label: 'Visualisierung' },
  { id: 'analysis', label: 'Laufzeiten' },
  { id: 'usecases', label: 'Anwendungen' },
];

const Header = () => {
  const items = useMemo(() => sections, []);

  return (
    <header className="hp-header">
      <div className="hp-header__inner">
        <h1>Heap-Präsentation</h1>
        <nav aria-label="Hauptnavigation">
          <ul>
            {items.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
