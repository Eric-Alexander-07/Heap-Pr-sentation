/**
 * HeapsortExplanation.jsx
 * Beschreibt den Ablauf des Heapsort-Algorithmus in klaren Schritten.
 */
const steps = [
  {
    title: 'Build Heap',
    description:
      'Aus dem unsortierten Array wird ein Max-Heap aufgebaut. Durch `heapify` ab der Mitte nach oben rückt das größte Element nach ganz oben.',
    marker: '01',
  },
  {
    title: 'Heapify',
    description:
      'Nach jedem Entfernen des Maximums wird der Heap wiederhergestellt: Der neue Wurzelknoten “sinkt” nach unten, bis die Heap-Eigenschaft erfüllt ist.',
    marker: '02',
  },
  {
    title: 'Swap & Repeat',
    description:
      'Das Maximum wandert ans Ende des Arrays. Der Heap wird um dieses Element verkleinert und der Vorgang wiederholt sich bis alles sortiert ist.',
    marker: '03',
  },
];

const HeapsortExplanation = () => {
  return (
    <section id="heaps" className="hp-section hp-section--timeline">
      <div className="hp-section__content">
        <h2>Heapsort Schritt für Schritt</h2>
        <p>
          Heapsort kombiniert die Heap-Datenstruktur mit einem klar definierten Ablauf.
          Die folgenden Phasen helfen, das Verfahren logisch nachzuvollziehen.
        </p>
      </div>
      <div className="hp-timeline" aria-label="Ablauf Heapsort">
        {steps.map((step) => (
          <article key={step.title} className="hp-timeline__item">
            <span className="hp-timeline__marker">{step.marker}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HeapsortExplanation;
