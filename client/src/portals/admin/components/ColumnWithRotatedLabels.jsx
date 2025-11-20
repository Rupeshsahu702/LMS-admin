import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// ColumnWithRotatedLabels.jsx
// Usage: <ColumnWithRotatedLabels data={yourDataArray} height={400} />
// yourDataArray should look like: [{ category: 'A', value: 40 }, { category: 'B', value: 55 }]

export default function ColumnWithRotatedLabels({ data, height = 400 }) {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // create root and theme
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();

    // create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      }),
    );

    // sample data if none given
    const chartData =
      (data && data.length > 0) || false
        ? data
        : [
            { category: 'Jan', value: 50 },
            { category: 'Feb', value: 78 },
            { category: 'Mar', value: 63 },
            { category: 'Apr', value: 90 },
            { category: 'May', value: 120 },
          ];

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });

    // rotate category labels on the X axis
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p1,
      oversizedBehavior: 'wrap',
      maxWidth: 100,
      dx: 0,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'category',
        renderer: xRenderer,
      }),
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      }),
    );

    xAxis.data.setAll(chartData);

    // Create column series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, { labelText: '{valueY}' }),
      }),
    );

    series.columns.template.setAll({
      cornerRadiusTL: 6,
      cornerRadiusTR: 6,
      cornerRadiusBL: 6,
      cornerRadiusBR: 6,
      strokeOpacity: 0,
      fill: am5.color('#3b82f5'), // 🔥 bar color
      stroke: am5.color('#ff4d4d'),
    });

    // Add rotated labels above each column (data label bullets)
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          text: '{valueY}',
          centerX: am5.p50,
          centerY: am5.p100,
          populateText: true,
          rotation: -90, // rotate the label itself
          dx: 10,
          dy: -10,
          fontSize: 12,
          // If desired, adjust fill or other styling here
        }),
      });
    });

    series.data.setAll(chartData);

    // Make chart animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // cleanup
    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div style={{ width: '100%', height }}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
