/**
 * UseCases.jsx
 * Beschreibt typische Einsatzgebiete von Heaps ohne zusaetzliche Formulare.
 */
const useCaseCards = [
  {
    title: 'Sortieren mit garantierter Laufzeit',
    text: 'Heapsort bleibt bei O(n log n) und vermeidet Worst-Case-Überraschungen in echtzeitkritischen Szenarien wie Flugzeugsteuerungen oder Medizingeräten.',
  },
  {
    title: 'In-place-Sortierung mit wenig Speicher',
    text: 'Durch O(1) Zusatzspeicher passt Heapsort zu eingebetteten oder mobilen Plattformen, die grosse Datenmengen trotz knappen RAM sortieren müssen.',
  },
  {
    title: 'Teilweises Sortieren / Top-k-Elemente',
    text: 'Ein Heap liefert effizient die k größten oder kleinsten Elemente, ohne die komplette Datenmenge zu sortieren – nützlich für Top-10-Ranglisten von Produkten oder Suchbegriffen.',
  },
  {
    title: 'Implementierung von Prioritätswarteschlangen',
    text: 'Heaps bilden die Basis fuer Priority Queues, damit Elemente mit höchster Priorität zuerst verarbeitet werden, etwa in Betriebssystem-Schedulern oder Dijkstra-Pfadsuchen.',
  },
];

const UseCases = () => {
  return (
    <section id="usecases" className="hp-section hp-section--usecases">
      <div className="hp-section__content">
        <h2>Typische Anwendungen</h2>
        <p>
          Diese vier Szenarien zeigen, wie Heapsort dank garantierter Laufzeit, geringem Speicherbedarf
          und gezielter Auswahlmechanismen in Praxisprojekten ueberzeugt.
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

