import React,{useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


import { useCart, useDispatch } from '../components/ContextReducer';
export default function Cart() {
    const [qty, setQty] = useState(1)
    let data = useCart();
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



    let dispatch = useDispatch();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }


    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("UserEmail");

        let response = await fetch(`${BASE_URL}/api/orderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toString()

            })
        });
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
        console.log("your img data",data)
    }

    let totalPrice = data.reduce((total, food) => {
        
       return total + food.qty * Number(food.price || 0);
        
    }, 0);



    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td> {food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                                        onClick={() => dispatch({ type: "REMOVE", index })}
                                        aria-label="Remove item"
                                        title="Remove item"
                                        style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                                    >
                                        <DeleteIcon style={{ color: "white", fontSize: "18px" }} />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}