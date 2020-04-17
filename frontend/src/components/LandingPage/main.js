import React, { Component } from 'react';
import Form from "./form";

class Main extends Component {
  render() {
    return (
      <main>


        <section className="intro">
          <h2>About Us</h2>
          <div>
            <p>Being the agent of distribution companies, CPPA-G has the regulatory obligation of submission of forecasted wholesale electricity prices (monthly references of energy and capacity) to regulate every financial year. We aim to become a world-class power market operator by providing the optimum environment for trading electricity in the Pakistani power market</p>
          </div>
        </section>

        <div>
          <div className="services">
            <div className="service-one">
              <p className="service-icon"><i className="fas fa-database"></i></p>
              <p className="service-title">Storing</p>
              <p>Extensive data is stored in database with improved data preservation, data security, reliability and data retreival speed</p>
            </div>
            <div className="service-two">
              <p className="service-icon"><i class="fas fa-calculator"></i></p>
              <p className="service-title">Predicting</p>
              <p>Capture inter-alia, existing contractual frameworks of various generations, financial settlements, transmission network, load and renewables forecast, Hydrology, Fuel price Forecast etc.</p>

            </div>
            <div className="service-three">
              <p className="service-icon"><i className="fas fa-chart-line"></i></p>
              <p className="service-title">Visualizing</p>
              <p>Direct interaction with data, have a rapid identification of the latest trends, make better predictive analysis, make huge data easily comprehensible and have a customized data-visualization.  </p>

            </div>
          </div>

        </div>



        <div className="gallery">
          <div className="gallery-item-one"></div>
          <div className="gallery-item-two"></div>
          <div className="gallery-item-three"></div>
          <div className="gallery-item-four"></div>
          <div className="gallery-item-five"></div>
          <div className="gallery-item-six"></div>

        </div>

        <section>
          <h2>Our Mission</h2>
          <div>
            <p>It aims to help CPPA-G (Central power purchasing agency) to handle immense data of the fuel prices, hydrology, transmission network etc. from all over Pakistan</p>
            <p>It can handle extensive data in a more robust way with greater data integrity and independence from applications programs, improved data security, reduced data entry, storage and retrieval costs with an increased consistency. This data is fed into a Wholesale Electricity price forecasting model (5-years horizon) using dispatch optimization tool namely Stochastic Dual Dynamic Programming (SDDP) capturing inter-alia, existing contractual frameworks of various generations, financial settlements, transmission network, load and renewables forecast, Hydrology, Fuel price Forecast etc. It allows CPPA-G to have a direct interaction with data, have a rapid identification of the latest trends, make better predictive analysis, make huge data easily comprehensible and have a customized data-visualization. </p>
          </div>
        </section>


        <section>
          <h2>Contact Us</h2>
          <Form />

        </section>


      </main>
    );
  }
}

export default Main;
