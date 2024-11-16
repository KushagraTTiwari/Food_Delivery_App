import React, { useEffect, useState } from 'react';
import Navbar from '../componenets/Navbar';
import Footer from '../componenets/Footer';
import Card from '../componenets/Card';
import axios from "axios";
import { config } from "../App";

export default function Home() {
  // console.log('hello');
  const [search, setSearch] = useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const loadDataCat = async () => {
    try {
      let responseCat = await axios.get(`${config.endpoint}/category`);
      // console.log("Categories:", responseCat.data);
      setFoodCat(responseCat.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      let responseData = await axios.get(`${config.endpoint}/data`);
      // console.log("Food Data:", responseData.data);
      setFoodData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDataCat();
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" style={{objectFit:"contain !important"}}>
                        <img src="https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg" className="d-block w-100" style={{filter:"brightness(30%)", objectFit:"cover", height: "500px"}} alt="..." />
                    </div>
                    <div className="carousel-item" >
                        <img src="https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704060_640.jpg" className="d-block w-100" style={{filter:"brightness(30%)" , objectFit:"cover", height: "500px"}} alt="..." />
                    </div>
                    <div className="carousel-item" >
                        <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg" className="d-block w-100" style={{filter:"brightness(30%)" , objectFit:"cover", height: "500px"}} alt="..." />
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
      <div className='container'>
        {
          foodCat.length > 0 ? foodCat.map((data, index) => {
            return (
              <div key={index}>
                <div className='fs-3 m-2'>{data.CategoryName}</div>
                <hr />
                <div className="row mb-3">
                  {foodData.length > 0 ? foodData.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItem => {
                      return (
                        <div key={filterItem._id} className="col-12 col-md-6 col-lg-3" >
                          <Card foodItem={filterItem} options={filterItem.options[0]}/>
                        </div>
                      );
                    }) : <div>Item not found</div>}
                </div>
              </div>
            );
          }) : <div className='d-flex justify-content-center align-items-center m-3'><h3>Data Not Found</h3></div>
        }
      </div>
      <Footer />
    </div>
  );
}
