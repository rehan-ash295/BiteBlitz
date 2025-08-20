import { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";




export default function Card(props) {
    const data = useCart();
    const dispatch = useDispatch();
    const priceRef = useRef();
    let options = props.foodOptions;
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    let finalPrice = qty * parseInt(options[size])
    let foodItem = props.fooItems;


    let priceOptions = Object.keys(options)

    const handleAddToCart = async (e) => {
        e.preventDefault();

        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }

        if (food) {
            if (food.size === size) {
                if (food.qty !== qty) {
                    await dispatch({
                        type: "UPDATE",
                        id: foodItem._id,
                        size: size, 
                        price: finalPrice,
                        qty: qty
                    })

                    return
                }

            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{
                    width: "18rem",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "none",
                    boxShadow: "none",
                    backdropFilter: "blur(6px)",
                    color: "white",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"

                }}>
                    <img src={props.fooItems.img} style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px"
                    }} className="card-img-top " alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooItems.name}</h5>
                        <p className="card-text">{props.fooItems.description}</p>
                        <a href="#"
                            className="btn"
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "12px",
                                padding: "10px 20px",
                                color: "#fff",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.transform = "scale(1)";
                            }} onClick={handleAddToCart}>Add to Cart</a>
                        <div className="container w-100"></div>
                        <select className="m-2 h-100 rounded" onChange={(e) => setQty(e.target.value)} style={{
                            background: "linear-gradient(to right, #30cfd0, #330867)",
                            color: "white",
                            border: "none",
                            padding: "8px",
                            fontWeight: "500",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                            outline: "none",
                            cursor: "pointer"
                        }}
                        >
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1} style={{
                                        backgroundColor: "#ffffff",
                                        color: "#000000",
                                        fontWeight: "500"
                                    }}
                                    >{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}

                        </select>
                        <div className="d-inline h-100 fs-5" >₹{finalPrice}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}