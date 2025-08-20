import { createContext, useContext, useReducer } from "react"
const CardStateContext = createContext();
const CardDispatchContext = createContext();

export default function CartProvider({ children }) {

    const reducer = (state, action) => {

        switch (action.type) {
            case "ADD":
                return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
            case "REMOVE":
                let newArr = [...state]
                newArr.splice(action.index, 1)
                return newArr;
            case "DROP":
                let empArray = []
                return empArray
            case "UPDATE":
                let arr = [...state];
                arr.find((food, index) => {
                    if (food.id === action.id && food.size === action.size) {
                        arr[index] = {
                            ...food,
                            qty: parseInt(action.qty),
                            price: action.price
                        };
                        return true; 
                    }
                    return false;
                });
                return arr;

            default:
                console.log("Error in Reducer");

        }
    }
    const [state, dispatch] = useReducer(reducer, [])

    return (
        <CardDispatchContext.Provider value={dispatch}>
            <CardStateContext.Provider value={state}>
                {children}
            </CardStateContext.Provider >
        </CardDispatchContext.Provider>


    )
}

export const useCart = () => useContext(CardStateContext);
export const useDispatch = () => useContext(CardDispatchContext);
