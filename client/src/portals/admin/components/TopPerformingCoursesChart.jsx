import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function TopPerformingCoursesChart({ data, height = 550 }) {
  const chartDivRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (rootRef.current) {
      rootRef.current.dispose();
      rootRef.current = null;
    }

    if (!chartDivRef.current) return;

    // Create root element
    const root = am5.Root.new(chartDivRef.current);
    rootRef.current = root;

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Remove amCharts logo
    if (root._logo) {
      try {
        root._logo.dispose();
      } catch (e) {}
    }

    // Create chart
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        startAngle: -84,
        endAngle: 264,
        innerRadius: am5.percent(40),
      }),
    );

    // Add cursor
    const cursor = chart.set(
      'cursor',
      am5radar.RadarCursor.new(root, {
        behavior: 'zoomX',
      }),
    );
    cursor.lineY.set('forceHidden', true);

    // Add scrollbar
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
        exportable: false,
      }),
    );

    // Prepare data - convert enrollment trends to flat array
    const defaultData = [
      { category: 'React - Jan', value: 42, course: 'React Masterclass', month: 'Jan' },
      { category: 'React - Feb', value: 45, course: 'React Masterclass', month: 'Feb' },
      { category: 'React - Mar', value: 48, course: 'React Masterclass', month: 'Mar' },
      { category: 'React - Apr', value: 46, course: 'React Masterclass', month: 'Apr' },
      { category: 'React - May', value: 51, course: 'React Masterclass', month: 'May' },
      { category: 'React - Jun', value: 54, course: 'React Masterclass', month: 'Jun' },
      { category: 'Python - Jan', value: 35, course: 'Python Data Science', month: 'Jan' },
      { category: 'Python - Feb', value: 38, course: 'Python Data Science', month: 'Feb' },
      { category: 'Python - Mar', value: 41, course: 'Python Data Science', month: 'Mar' },
      { category: 'Python - Apr', value: 39, course: 'Python Data Science', month: 'Apr' },
      { category: 'Python - May', value: 43, course: 'Python Data Science', month: 'May' },
      { category: 'Python - Jun', value: 45, course: 'Python Data Science', month: 'Jun' },
      { category: 'UI/UX - Jan', value: 31, course: 'UI/UX Design', month: 'Jan' },
      { category: 'UI/UX - Feb', value: 33, course: 'UI/UX Design', month: 'Feb' },
      { category: 'UI/UX - Mar', value: 35, course: 'UI/UX Design', month: 'Mar' },
      { category: 'UI/UX - Apr', value: 34, course: 'UI/UX Design', month: 'Apr' },
      { category: 'UI/UX - May', value: 37, course: 'UI/UX Design', month: 'May' },
      { category: 'UI/UX - Jun', value: 39, course: 'UI/UX Design', month: 'Jun' },
      { category: 'Marketing - Jan', value: 28, course: 'Digital Marketing', month: 'Jan' },
      { category: 'Marketing - Feb', value: 29, course: 'Digital Marketing', month: 'Feb' },
      { category: 'Marketing - Mar', value: 31, course: 'Digital Marketing', month: 'Mar' },
      { category: 'Marketing - Apr', value: 30, course: 'Digital Marketing', month: 'Apr' },
      { category: 'Marketing - May', value: 33, course: 'Digital Marketing', month: 'May' },
      { category: 'Marketing - Jun', value: 35, course: 'Digital Marketing', month: 'Jun' },
      { category: 'Node.js - Jan', value: 26, course: 'Node.js Backend', month: 'Jan' },
      { category: 'Node.js - Feb', value: 28, course: 'Node.js Backend', month: 'Feb' },
      { category: 'Node.js - Mar', value: 29, course: 'Node.js Backend', month: 'Mar' },
      { category: 'Node.js - Apr', value: 28, course: 'Node.js Backend', month: 'Apr' },
      { category: 'Node.js - May', value: 31, course: 'Node.js Backend', month: 'May' },
      { category: 'Node.js - Jun', value: 32, course: 'Node.js Backend', month: 'Jun' },
      { category: 'Mobile - Jan', value: 24, course: 'Mobile App Dev', month: 'Jan' },
      { category: 'Mobile - Feb', value: 25, course: 'Mobile App Dev', month: 'Feb' },
      { category: 'Mobile - Mar', value: 27, course: 'Mobile App Dev', month: 'Mar' },
      { category: 'Mobile - Apr', value: 26, course: 'Mobile App Dev', month: 'Apr' },
      { category: 'Mobile - May', value: 28, course: 'Mobile App Dev', month: 'May' },
      { category: 'Mobile - Jun', value: 30, course: 'Mobile App Dev', month: 'Jun' },
    ];

    // Transform input data if provided
    let chartData = defaultData;

    // Create axes
    const xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 30,
    });

    xRenderer.grid.template.set('forceHidden', true);

    // HIDE the circular labels completely
    xRenderer.labels.template.setAll({
      forceHidden: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'category',
        renderer: xRenderer,
      }),
    );

    const yRenderer = am5radar.AxisRendererRadial.new(root, {});
    yRenderer.labels.template.setAll({
      centerX: am5.p50,
      fill: am5.color('#e5e7eb'),
      fontSize: 11,
    });

    yRenderer.grid.template.setAll({
      stroke: am5.color('#3f3f46'),
      strokeOpacity: 0.3,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: yRenderer,
      }),
    );

    // Add series
    const series = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        name: 'Course Enrollments',
        sequencedInterpolation: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
      }),
    );

    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadius: 5,
      tooltipText: '{course}\n{month}: {valueY} enrollments',
      strokeOpacity: 0,
    });

    // Make each column to be of a different color
    series.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    // Set data
    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 20,
        layout: root.gridLayout,
        clickTarget: 'none',
      }),
    );

    legend.labels.template.setAll({
      fill: am5.color('#e5e7eb'),
      fontSize: 11,
    });

    // Create legend data manually from courses
    const courses = [
      'React Masterclass',
      'Python Data Science',
      'UI/UX Design',
      'Digital Marketing',
      'Node.js Backend',
      'Mobile App Dev',
    ];

    const legendData = courses.map((course, index) => ({
      name: course,
      fill: chart.get('colors').getIndex(index * 6), // Spread colors
    }));

    legend.data.setAll(legendData);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
      rootRef.current = null;
    };
  }, [data, height]);

  return (
    <div
      style={{
        width: '100%',
        height: height,
        background: '#27272a',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div ref={chartDivRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
