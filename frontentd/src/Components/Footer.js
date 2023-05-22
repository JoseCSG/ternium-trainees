import React from "react";

function Footer()
{
    return(
        <section className="section-footer bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h6 className='text-center my-3'>Company Info</h6>
                        <hr/>
                        <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opp
                        </p>
                    </div>
                    <div className="col">
                        <h6 className='text-center my-3'>Contact Info</h6>
                        <hr/>
                        <div>
                            <p className="text-white mb-1">
                                #64 Rio de la Plata Roma
                            </p>
                        </div>
                        <div>
                            <p className="text-white mb-1">
                                8717341255
                            </p>
                        </div>

                    </div>


                </div>

            </div>

        </section>

    );
}

export default Footer;