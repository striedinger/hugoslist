import { Draggable} from "react-beautiful-dnd";
import cx from 'classnames';
import ui from '../../lib/styles/ui.module.css';
import styles from './styles.module.css';

const ListItem = props => {
  const { item, index } = props;
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <li className={cx(styles['list-item'], ui.card)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className={styles.heading}>
            <span className={styles.handle} />
            <h2 className={styles.title}>{item.title}</h2>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
