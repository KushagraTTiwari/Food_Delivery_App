import React from 'react'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
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
    )
}
