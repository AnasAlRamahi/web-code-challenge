import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from './DragHandle/DragHandle';
import { TableCell } from '../../../common/StyledComponents';

interface DraggableTableRowProps {
  id: number;
  columns: string[];
  children?: React.ReactNode;
}

export const DraggableTableRow = ({ id, columns, children }: DraggableTableRowProps) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <tr ref={setNodeRef} style={style} key={id} id={id.toString()}>
      {
        isDragging ? (
          <TableCell
            key={`static-${id}`}
            colSpan={columns.length + 1}
            style={{ backgroundColor: "#fff9c4" }}
          ></TableCell>
        )
          :
          (
            <>
              <td>
                <DragHandle isDragging={isDragging} {...listeners} {...attributes} />
              </td>
              {children}
            </>
          )
      }
    </tr>
  );
}
