import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  console.log(label, payload, active);
  if (active && payload && payload.length) {
    return (
      <div
        style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}
      >
        <p>{`Generation ${label}`}</p>
        <p>{`Best Fitness: ${payload[1].value}`}</p>
        <p>{`Average Fitness: ${payload[1].payload.averageFitness}`}</p>
        <p>{`Best Gene: [${payload[1].payload.genes}]`}</p>
        <p>Gene:</p>
        <div className="chessboard">
          {[...Array(8)].map((_, rowIndex) => (
            <div key={rowIndex} className="chess-row">
              {[...Array(8)].map((__, colIndex) => (
                <div
                  key={colIndex}
                  className={`
            chess-square
            ${
              (rowIndex + colIndex) % 2 === 0
                ? 'chess-square-even'
                : 'chess-square-odd'
            }
            ${
              payload[1].payload.genes[colIndex] === rowIndex ? 'highlight' : ''
            }
          `}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const Chart = ({ generationData }) => {
  return (
    <LineChart
      width={800}
      height={500}
      data={generationData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="generation" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="averageFitness" stroke="#8884d8" />
      <Line type="monotone" dataKey="bestFitness" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
