import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge';
import { useState } from "react";
import Modal from "../Modal"
import Cart from "../screens/Cart"
import { useCart } from "./ContextReducer";



export default function Navbar() {
    const[CartView, setCartView]=useState(false)
    const navigate = useNavigate();
    const data=useCart()

    const handleLogout= ()=>{
        localStorage.removeItem("Localtoken");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-gradient">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">BiteBlitz</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link-active fs-5 fw-semibold text-dark text-decoration-none m-4" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("Localtoken")) ? <Link className="nav-link-active fs-5 fw-semibold text-dark text-decoration-none" aria-current="page" to="/myOrderData">My Orders
                                </Link> : ""
                            }
                        </ul>

                        {(!localStorage.getItem("Localtoken")) ?
                            <div className="d-flex ms-auto" >
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="SignUp">SignUp</Link>
                            </div> :<div><div className="btn bg-white text-success mx-1" to="/login" onClick={()=>{setCartView(true)}}>My Cart
                            {(data.length==0)?"":<Badge pill bg="danger">{data.length}</Badge>}
                            
                            </div>
                            {CartView?  <Modal onClose={()=> setCartView(false)} ><Cart></Cart></Modal>: null }
                             <Link className="btn bg-white text-success mx-1" to="/" onClick={handleLogout}>Log Out</Link>
                             </div>

                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}