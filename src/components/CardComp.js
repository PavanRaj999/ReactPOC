import React from 'react';
import MtrlCard from '@material-ui/core/Card';
import MtrlTypography from '@material-ui/core/Typography';
import MtrlCardContent from '@material-ui/core/CardContent';
import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, id, index }) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.dragHandleProps}  {...provided.draggableProps}>
                    <MtrlCard style={styles.cardContainer}>
                        <MtrlCardContent>
                            <MtrlTypography gutterBottom>
                                {text}
                            </MtrlTypography>
                        </MtrlCardContent>
                    </MtrlCard>
                </div>
            )}

        </Draggable>
    );
};

const styles = {
    cardContainer: {
        marginBottom: 8,
        marginTop: 10,
        fontFamily: "Roboto"
    }
}


export default Card;