/**
 * UseCases.jsx
 * Beschreibt typische Einsatzgebiete von Heaps ohne zusätzliche Formulare.
 */
const useCaseCards = [
  {
    title: 'Prioritätswarteschlangen',
    text: 'Betriebssysteme und Router liefern dringende Ereignisse zuerst – Heaps halten die Reihenfolge.',
  },
  {
    title: 'Scheduling & Ressourcenplanung',
    text: 'Jobs und Prozesse werden nach Wichtigkeit sortiert, ohne jedes Mal neu zu sortieren.',
  },
  {
    title: 'Graph-Algorithmen',
    text: 'Dijkstra, Prim oder A* nutzen Heaps, um Knoten mit der kleinsten Distanz schnell zu wählen.',
  },
  {
    title: 'Streaming & Top-k',
    text: 'Laufende Datenströme lassen sich überwachen und die größten k Werte effizient bestimmen.',
  },
];

const UseCases = () => {
  return (
    <section id="usecases" className="hp-section hp-section--usecases">
      <div className="hp-section__content">
        <h2>Typische Anwendungen</h2>
        <p>
          Sobald Elemente nach Priorität geordnet werden sollen, spielt der Heap seine Stärke aus. Die
          folgenden Beispiele zeigen, wo Heapsort und seine Datenstruktur im Alltag auftauchen.
        </p>
      </div>
      <div className="hp-usecases__grid">
        {useCaseCards.map((card) => (
          <article key={card.title} className="hp-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
