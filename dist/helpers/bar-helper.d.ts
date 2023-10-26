import { Task } from "../types/public-types";
import { BarTask } from "../types/bar-task";
import { BarMoveAction } from "../types/gantt-task-actions";
export declare const convertToBarTasks: (tasks: Task[], dates: Date[], columnWidth: number, rowHeight: number, taskHeight: number, barCornerRadius: number, handleWidth: number, rtl: boolean, barProgressColor: string, barProgressSelectedColor: string, barBackgroundColor: string, barBackgroundSelectedColor: string, projectProgressColor: string, projectProgressSelectedColor: string, projectBackgroundColor: string, projectBackgroundSelectedColor: string, milestoneBackgroundColor: string, milestoneBackgroundSelectedColor: string) => BarTask[];
export declare const convertToBarTask: (task: Task, index: number, dates: Date[], columnWidth: number, rowHeight: number, taskHeight: number, barCornerRadius: number, handleWidth: number, rtl: boolean, barProgressColor: string, barProgressSelectedColor: string, barBackgroundColor: string, barBackgroundSelectedColor: string, projectProgressColor: string, projectProgressSelectedColor: string, projectBackgroundColor: string, projectBackgroundSelectedColor: string, milestoneBackgroundColor: string, milestoneBackgroundSelectedColor: string) => BarTask;
export declare const convertToBar: (task: Task, index: number, dates: Date[], columnWidth: number, rowHeight: number, taskHeight: number, barCornerRadius: number, handleWidth: number, rtl: boolean, barProgressColor: string, barProgressSelectedColor: string, barBackgroundColor: string, barBackgroundSelectedColor: string) => BarTask;
export declare const convertToMilestone: (task: Task, index: number, dates: Date[], columnWidth: number, rowHeight: number, taskHeight: number, barCornerRadius: number, handleWidth: number, milestoneBackgroundColor: string, milestoneBackgroundSelectedColor: string) => BarTask;
export declare const taskXCoordinate: (xDate: Date, dates: Date[], columnWidth: number) => number;
export declare const taskXCoordinateRTL: (xDate: Date, dates: Date[], columnWidth: number) => number;
export declare const taskYCoordinate: (index: number, rowHeight: number, taskHeight: number) => number;
export declare const progressWithByParams: (taskX1: number, taskX2: number, progress: number, rtl: boolean) => number[];
export declare const progressByProgressWidth: (progressWidth: number, barTask: BarTask) => number;
export declare const progressByX: (x: number, task: BarTask) => number;
export declare const progressByXRTL: (x: number, task: BarTask) => number;
export declare const getProgressPoint: (progressX: number, taskY: number, taskHeight: number) => string;
export declare const startByX: (x: number, xStep: number, task: BarTask) => number;
export declare const endByX: (x: number, xStep: number, task: BarTask) => number;
export declare const moveByX: (x: number, xStep: number, task: BarTask) => number[];
export declare const dateByX: (x: number, taskX: number, taskDate: Date, xStep: number, timeStep: number) => Date;
/**
 * Method handles event in real time(mousemove) and on finish(mouseup)
 */
export declare const handleTaskBySVGMouseEvent: (svgX: number, action: BarMoveAction, selectedTask: BarTask, xStep: number, timeStep: number, initEventX1Delta: number, rtl: boolean) => {
    isChanged: boolean;
    changedTask: BarTask;
};
export declare const handleTaskBySVGMouseEventForBar: (svgX: number, action: BarMoveAction, selectedTask: BarTask, xStep: number, timeStep: number, initEventX1Delta: number, rtl: boolean) => {
    isChanged: boolean;
    changedTask: BarTask;
};
export declare const handleTaskBySVGMouseEventForMilestone: (svgX: number, action: BarMoveAction, selectedTask: BarTask, xStep: number, timeStep: number, initEventX1Delta: number) => {
    isChanged: boolean;
    changedTask: BarTask;
};
