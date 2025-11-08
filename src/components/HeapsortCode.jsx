/**
 * HeapsortCode.jsx
 * Zeigt einen Codeauszug der Heapsort-Logik mit erklärender Caption.
 */
const codeSnippet = `function heapsort(arr) {
  const heapify = (size, root) => {
    let largest = root;
    const left = 2 * root + 1;
    const right = left + 1;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  };

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
    heapify(arr.length, i);
  }

  for (let end = arr.length - 1; end > 0; end -= 1) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(end, 0);
  }

  return arr;
}`;

const HeapsortCode = () => {
  return (
    <section id="code" className="hp-section hp-code">
      <div className="hp-section__content">
        <h2>Code-Snippet: Heapsort in JavaScript</h2>
        <p>
          Der folgende Ausschnitt zeigt die Kernlogik der Visualisierung. Besonders wichtig ist,
          dass `heapify` rekursiv dafür sorgt, dass die Heap-Eigenschaft nach jedem Tausch erhalten
          bleibt.
        </p>
      </div>
      <div className="hp-code__panel">
        <div className="hp-code__status">
          <span className="hp-dot hp-dot--red" />
          <span className="hp-dot hp-dot--yellow" />
          <span className="hp-dot hp-dot--green" />
          <span className="hp-code__filename">HeapsortVisualizer.js</span>
        </div>
        <pre>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    </section>
  );
};

export default HeapsortCode;
