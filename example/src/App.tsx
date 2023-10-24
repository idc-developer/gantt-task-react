import React from "react";
import {Task, TaskItem, BarTask, ViewMode, Gantt} from "gantt-task-react";
import {ViewSwitcher} from "./components/view-switcher";
import {getStartEndDateForProject, initTasks} from "./helper";
import "gantt-task-react/dist/index.css";
import {ganttDateRange, seedDates, Calendar} from "gantt-task-react";

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
  const [startDate, endDate] = ganttDateRange(tasks, view, 5);

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = {...project, start, end};
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      />
      <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
      />

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={1000}
          height={300}
          fontFamily={"helvetica"}
        >
          <Calendar dateSetup={{viewMode: view, dates: seedDates(startDate, endDate, view)}} columnWidth={40}
                    viewMode={view} locale={"de-de"} rtl={false}
                    fontFamily={"Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue"}
                    fontSize="14px" headerHeight={50}/>
          <g className="bar">
          <TaskItem task={{
            index: 0,
            styles: {
              backgroundColor: "#b8c2cc",
              backgroundSelectedColor: "#aeb8c2",
              progressSelectedColor: "#8282f5",
              progressColor: "#a3a3ff"
            },
            typeInternal: "task",
            x1: 100,
            x2: 200,
            y: 100,
            height: 40,
            progressX: 100,
            barChildren: [],
            handleWidth: 3,
            barCornerRadius: 3,
            progressWidth: 20, ...tasks[0]
          } as BarTask}
                    arrowIndent={5}
                    isDelete={false}
                    taskHeight={50}
                    isSelected={false}
                    rtl={false}
                    isDateChangeable={false}
                    isProgressChangeable={false}
                    onEventStart={() => 1}/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default App;
