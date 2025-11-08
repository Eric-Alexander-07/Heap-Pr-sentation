/**
 * HeapTree.jsx
 * Zeichnet einen Heap als Baum mit Verbindungslinien via SVG.
 */
import { memo, useMemo } from 'react';

const HeapTree = ({ values = [], highlightedNodes = [] }) => {
  if (!values.length) {
    return (
      <div className="hp-heap-tree hp-heap-tree--empty">
        <p>Keine Elemente vorhanden.</p>
      </div>
    );
  }

  const { nodes, edges, width, height } = useMemo(() => {
    const computedLevels = [];
    let pointer = 0;
    let nodesPerLevel = 1;
    while (pointer < values.length) {
      computedLevels.push(values.slice(pointer, pointer + nodesPerLevel));
      pointer += nodesPerLevel;
      nodesPerLevel *= 2;
    }

    const svgWidth = 600;
    const svgHeight = Math.max(computedLevels.length * 120, 280);
    const verticalSpacing = svgHeight / (computedLevels.length + 1);

    const nodeData = values.map((value, index) => {
      const level = Math.floor(Math.log2(index + 1));
      const nodesInLevel = 2 ** level;
      const positionInLevel = index - (2 ** level - 1);
      const x = ((positionInLevel + 1) / (nodesInLevel + 1)) * svgWidth;
      const y = (level + 1) * verticalSpacing;

      return {
        index,
        value,
        x,
        y,
        isHighlighted: highlightedNodes.includes(index),
      };
    });

    const edgeData = nodeData
      .filter((node) => node.index > 0)
      .map((node) => {
        const parentIndex = Math.floor((node.index - 1) / 2);
        const parent = nodeData[parentIndex];
        if (!parent) return null;

        return {
          key: `edge-${parentIndex}-${node.index}`,
          x1: parent.x,
          y1: parent.y,
          x2: node.x,
          y2: node.y,
        };
      })
      .filter(Boolean);

    return {
      nodes: nodeData,
      edges: edgeData,
      width: svgWidth,
      height: svgHeight,
    };
  }, [highlightedNodes, values]);

  return (
    <div className="hp-heap-tree" role="img" aria-label="Heap-Baum mit Linien">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="hp-heap-tree__svg"
      >
        {edges.map((edge) => (
          <line
            key={edge.key}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            className="hp-heap-tree__edge"
          />
        ))}
        {nodes.map((node) => (
          <g key={`node-${node.index}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="22"
              className={`hp-heap-tree__node ${node.isHighlighted ? 'is-active' : ''}`}
            />
            <text x={node.x} y={node.y + 4} className="hp-heap-tree__label">
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default memo(HeapTree);
