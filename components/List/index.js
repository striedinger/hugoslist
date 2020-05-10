import { useCallback } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import cx from 'classnames';
import ListItem from '../ListItem';
import ui from '../../lib/styles/ui.module.css';
import styles from './styles.module.css';

const InnerList = React.memo(function InnerList(props) {
  const { items } = props;
  return items.map((item, index) => (
    <ListItem item={item} index={index} key={item.id} />
  ));
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const List = props => {
  const { items, onUpdate } = props;
  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const newItems = reorder(items, source.index, destination.index);
    onUpdate(newItems);
  }, [items]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <ul className={cx(ui.card, styles.list)} ref={provided.innerRef} {...provided.droppableProps}>
            {items.length === 0 && <li className={styles.empty}>A great list starts here 🚀</li>}
            <InnerList items={items} />
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
