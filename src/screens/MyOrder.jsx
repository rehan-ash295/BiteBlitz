import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('UserEmail'));
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('UserEmail') 
            })
        }).then(async (res) => {
            let response = await res.json();
            setorderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    console.log(orderData);

    return (
        <div>
            <Navbar />

            <div className="container py-5">
  <h2 className="text-center mb-4 fw-bold text-primary">Your Order History</h2>
  <div className="row g-4">
    {Array.isArray(orderData?.orderData?.order_data) &&
      orderData.orderData.order_data.slice(0).reverse().map((group, groupIndex) => {
        if (!Array.isArray(group) || group.length === 0 || !group[0]?.Order_date) return null;

        const orderDate = group[0].Order_date;

        return (
          <div key={groupIndex} className="w-100">
            <div className="text-center my-4">
              <h5 className="text-muted">Ordered on: <span className="fw-semibold">{orderDate}</span></h5>
              <hr className="w-25 mx-auto" />
            </div>

            <div className="row justify-content-center">
              {group.slice(1).map((item, itemIndex) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemIndex}>
                  <div className="card shadow-sm border-0 h-100 hover-scale transition-all">
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{item.name}</h5>
                      <p className="card-text mb-1">
                        <strong>Qty:</strong> {item.qty} &nbsp;|&nbsp;
                        <strong>Size:</strong> {item.size}
                      </p>
                      <p className="card-text mb-2 text-muted">
                        <small>{orderDate}</small>
                      </p>
                      <div className="text-end fw-bold text-success fs-5">
                        ₹{item.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
  </div>
</div>



            <Footer />
        </div>
    );
}