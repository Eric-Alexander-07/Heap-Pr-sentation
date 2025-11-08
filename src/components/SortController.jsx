/**
 * SortController.jsx
 * Bietet Steuerungs-Elemente für die Heapsort-Animation (Buttons & Eingabe).
 */
const SortController = ({
  onStart,
  onPause,
  onStep,
  onReset,
  onGenerate,
  lengthInput,
  onLengthInputChange,
  arraySize,
  slowMode,
  onSlowModeChange,
  playState,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <div className="hp-controller">
      <div>
        <h3>Steuerung</h3>
        <p>Gib eine Feldlänge vor und starte danach die Animation.</p>
      </div>
      <form className="hp-controller__length" onSubmit={handleSubmit}>
        <label htmlFor="array-length-input">
          Feldlänge (5–40 Elemente)
          <input
            id="array-length-input"
            type="number"
            min="5"
            max="40"
            value={lengthInput}
            onChange={(event) => onLengthInputChange(event.target.value)}
          />
        </label>
        <button type="submit" className="hp-btn">
          Zufallszahlen erzeugen
        </button>
      </form>
      <p className="hp-controller__hint">
        Aktuelle Demo: <strong>{arraySize}</strong> Werte
      </p>
      <div className="hp-controller__buttons">
        <button type="button" onClick={onStart} className="hp-btn">
          Start
        </button>
        <button type="button" onClick={onPause} className="hp-btn hp-btn--ghost">
          Pause
        </button>
        <button type="button" onClick={onStep} className="hp-btn hp-btn--ghost">
          Schrittweise
        </button>
        <button type="button" onClick={onReset} className="hp-btn hp-btn--ghost">
          Reset
        </button>
      </div>
      <label className="hp-controller__checkbox">
        <input
          type="checkbox"
          checked={slowMode}
          onChange={(event) => onSlowModeChange(event.target.checked)}
        />
        Langsame Animation
      </label>
      <p className="hp-controller__status">
        Status: <span>{playState}</span>
      </p>
    </div>
  );
};

export default SortController;
