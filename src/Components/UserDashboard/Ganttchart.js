import React from 'react';
import { FrappeGantt } from 'frappe-gantt-react';

const Ganttchart = () => {
  const tasks = [
    {
      id: 'Task 1',
      name: 'Task 1',
      start: new Date(2024, 5, 1),
      end: new Date(2024, 6, 1),
      progress: 100,
      dependencies: ''
    },
    {
      id: 'Task 2',
      name: 'Task 2',
      start: new Date(2024, 5, 15),
      end: new Date(2024, 6, 1),
      progress: 50,
      dependencies: 'Task 1'
    }
  ];

  return (
    <FrappeGantt
      tasks={tasks}
      viewMode="Month"
      onClick={(task) => console.log(task)}
      onDateChange={(task, start, end) => console.log(task, start, end)}
      onProgressChange={(task, progress) => console.log(task, progress)}
      onDependenciesChange={(task, dependencies) => console.log(task, dependencies)}
    />
  );
};

export default Ganttchart;