import { CONSTANTS } from "../actions";


let listID = 3;
let cardID = 8;

const initialState = [

    {
        title: "To Do",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "Pay electricity bill"
            },
            {
                id: `card-${1}`,
                text: "Make grocery list"
            }
        ]
    },

    {
        title: "In Progress",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "Iron clothes"
            },
            {
                id: `card-${3}`,
                text: "Car service"
            },
            {
                id: `card-${4}`,
                text: "Eat breakfast"
            },
            {
                id: `card-${5}`,
                text: "Pack lunchbox"
            }

        ]
    },
    {
        title: "Done",
        id: `list-${2}`,
        cards: [
            {
                id: `card-${6}`,
                text: "Buy running shoes"
            },
            {
                id: `card-${7}`,
                text: "Shopping"
            }
        ]
    },

];

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`,
            };
            listID += 1;
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`,
            };
            cardID += 1;
            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            })

            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd
                //draggableId
            } = action.payload;
            const newState = [...state];
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id)
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }


            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);

            }
            return newState;

        default:
            return state;
    }
};

export default listReducer; 