import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { TableData } from "../types/tableTypes";

interface useTableDnDProps {
  data: TableData[];
}

export const useTableDnD = ({ data }: useTableDnDProps) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  }

  // This function is used to handle the end of a drag event
  // It takes a setState function as an argument and returns a handler function
  const handleDragEnd = (setState: React.SetStateAction<any>) => {
    return (event: any) => {
      const { active, over } = event;
      if (over?.id && active.id !== over?.id) {
        const oldIndex = data.findIndex(item => item.id === active.id);
        const newIndex = data.findIndex(item => item.id === over.id);
        setState((data: TableData[]) => {
          return arrayMove(data, oldIndex, newIndex);
        });
      }
      setActiveId(null);
    }
  }

  const handleDragCancel = () => {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = data.find(({ id }) => id === activeId);
    return row;
  }, [activeId, data]);

  return {
    activeId,
    selectedRow,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
