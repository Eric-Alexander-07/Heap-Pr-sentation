/**
 * HeapsortCode.jsx
 * Zeigt einen Codeauszug der Heapsort-Logik mit erklÃ¤render Caption.
 */
const codeSnippet = `class HeapSort {
  public static void sort(int[] arr) {
    int n = arr.length;

    for (int i = n / 2 - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    for (int end = n - 1; end > 0; end--) {
      swap(arr, 0, end);
      heapify(arr, end, 0);
    }
  }

  private static void heapify(int[] arr, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = left + 1;

    if (left < size && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < size && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest != root) {
      swap(arr, root, largest);
      heapify(arr, size, largest);
    }
  }

  private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}`;

const HeapsortCode = () => {
  return (
    <section id="code" className="hp-section hp-code">
      <div className="hp-section__content">
        <h2>Code-Snippet: Heapsort in Java</h2>
        <p>
          Die Java-Version spiegelt die gleiche Logik wie die Visualisierung wider. Besonders wichtig
          ist, dass <code>heapify</code> rekursiv dafür sorgt, dass die Heap-Eigenschaft nach jedem
          Tausch erhalten bleibt und <code>sort</code> den Heap Schritt für Schritt abbaut.
        </p>
      </div>
      <div className="hp-code__panel">
        <div className="hp-code__status">
          <span className="hp-dot hp-dot--red" />
          <span className="hp-dot hp-dot--yellow" />
          <span className="hp-dot hp-dot--green" />
          <span className="hp-code__filename">HeapSort.java</span>
        </div>
        <pre>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    </section>
  );
};

export default HeapsortCode;



