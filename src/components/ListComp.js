import React from 'react';
import Crad from './CardComp';
import AddButton from './AddButton';
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID }) => {
    return (
        <Droppable droppableId={String(listID)}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}
                    style={style.container}>
                    <b>{title}</b>
                    {cards.map((card, index) => (
                        <Crad
                            index={index}
                            key={card.id}
                            text={card.text}
                            id={card.id}
                        />))}
                    <AddButton listID={listID} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
};

const style = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 200,
        padding: 8,
        marginRight: 15

    }
}

export default List; 