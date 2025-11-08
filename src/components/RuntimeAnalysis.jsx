/**
 * RuntimeAnalysis.jsx
 * Zeigt die Laufzeit-Charakteristika von Heapsort im Vergleich zu anderen Algorithmen.
 */
const comparisons = [
  { name: 'Heapsort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', stable: '❌' },
  { name: 'Quicksort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', stable: '❌' },
  { name: 'Mergesort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', stable: '✅' },
  { name: 'Bubblesort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', stable: '✅' },
];

const RuntimeAnalysis = () => {
  return (
    <section id="analysis" className="hp-section hp-section--analysis">
      <div className="hp-section__content">
        <h2>Laufzeitanalyse</h2>
        <p>
          Heapsort garantiert immer <strong>O(n log n)</strong>, egal ob das Array schon sortiert ist
          oder nicht. Dadurch eignet er sich für Szenarien, in denen Konsistenz wichtiger ist als
          absolute Höchstleistung.
        </p>
      </div>
      <div className="hp-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Algorithmus</th>
              <th>Best Case</th>
              <th>Average</th>
              <th>Worst</th>
              <th>Stabil?</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.best}</td>
                <td>{row.average}</td>
                <td>{row.worst}</td>
                <td>{row.stable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RuntimeAnalysis;
