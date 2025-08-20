import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import { useEffect, useState } from "react"

export default function Home() {

    const [search, setsearch] = useState("")
    const [foodItem, setItem] = useState([]);
    const [foodCat, setCat] = useState([]);

    const loadData = async () => {
        const output = await fetch("http://localhost:5000/api/fooditem",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await output.json();
        setItem(data[0]);
        setCat(data[1])

    }

    useEffect(() => {
        loadData();

    }, [])





    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
            color: "white"


        }}>
            <div>
                <Navbar></Navbar>
                <div>
                    <div>
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
                            <div className="carousel-inner" id="carousel">
                                <div className="carousel-caption" style={{ zIndex: "5" }}>
                                    <div className="d-flex justify-content-center">
                                        <input className="form-control me-2" type="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search" aria-label="Search" />
                                    </div>

                                </div>
                                <div className="carousel-item active">
                                    <img src="\back2.webp" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="\back1.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="Dosa.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="container">
                        {
                            foodCat.length > 0 ? foodCat.map((data) => {
                                return (
                                    <div className="row mb-3" key={data._id}>
                                        <div key={data._id} className="fs-3 m-3">
                                            {data.CategoryName}

                                        </div>
                                        <hr></hr>
                                        {
                                            foodItem.length > 0 ? foodItem.filter((item) =>
                                                item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))


                                            ).map((filterIt) => {
                                                return (
                                                    <div className="col-12 col-md-6 col-lg-3" key={filterIt._id}><Card
                                                        fooItems={filterIt}
                                                        foodOptions={filterIt.options[0]}
                                                        
                                                        ></Card></div>
                                                )

                                            }) : "%%%%%%%%"
                                        }

                                    </div>
                                )
                            }) : "###############"

                        }

                    </div>


                </div>
                <Footer></Footer>
            </div>
        </div>
    )
}