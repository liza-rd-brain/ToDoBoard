import { ColumnType } from "../../types";

export const getColumnAfterDrag = (
  result: any,
  column: ColumnType
): ColumnType => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return column;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return column;
  }

  const start = column.columns[source.droppableId];
  const finish = column.columns[destination.droppableId];

  if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    };

    const newState = {
      ...column,
      columns: {
        ...column.columns,
        [newColumn.id]: newColumn,
      },
    };

    return newState;
  } else {
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumn = {
      ...column,
      columns: {
        ...column.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    return newColumn;
  }
};
