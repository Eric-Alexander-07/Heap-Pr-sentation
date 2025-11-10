/**
 * IntroHeaps.jsx
 * Einführung in Heaps mit einfacher Visualisierung als Array und Baum.
 */
import HeapTree from './HeapTree';

const sampleHeap = [42, 35, 31, 19, 27, 16, 14];

const IntroHeaps = () => {
  return (
    <section id="intro" className="hp-section hp-section--intro">
      <div className="hp-section__content">
        <h2>Was ist ein Heap?</h2>
        <p>
          Ein Heap ist eine spezielle Datenstruktur in Form eines vollständigen binären Baums, bei
          dem eine bestimmte Ordnung zwischen <em>Eltern-</em> und <em>Kindknoten</em> herrscht.
          Jeder Elternknoten ist bei einem <em>Max-Heap</em> größer oder gleich
          seinen Kindern – und bei einem <em>Min-Heap</em> kleiner oder gleich.
        </p>
        <ul className="hp-list">
          <li>Struktur: vollständiger Baum, aber gespeichert als kompaktes Array.</li>
          <li>Vergleiche finden immer nur zwischen Eltern- und Kindknoten statt.</li>
          <li>Ideal geeignet für Prioritätswarteschlangen.</li>
        </ul>
      </div>
      <div className="hp-intro__visuals">
        <div className="hp-visual-card">
          <p className="hp-visual-card__title">Array-Darstellung</p>
          <div className="hp-array-grid" aria-label="Heap als Array">
            {sampleHeap.map((value, index) => (
              <div key={value + index} className="hp-array-grid__cell">
                <span>{value}</span>
                <small>Index {index}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="hp-visual-card">
          <p className="hp-visual-card__title">Baum-Darstellung (Max-Heap)</p>
          <HeapTree values={sampleHeap} highlightedNodes={[0, 1, 2]} />
        </div>
      </div>
    </section>
  );
};

export default IntroHeaps;
