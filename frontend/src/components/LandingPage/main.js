import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import Form from "./form";

class Main extends Component {
  constructor() {
    super()
    this.changeToStore = this.changeToStore.bind(this)
    this.changeToPred = this.changeToPred.bind(this)
    this.changeToVisual = this.changeToVisual.bind(this)
    this.state = { redirect: null };

  }
  changeToStore() {
    this.setState({ redirect:'/database' })
  }
  changeToPred() {
    this.setState({ redirect:'/modules' })
  }
  changeToVisual() {
    this.setState({ redirect:'/landing' })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (

      <main>


        <section className="intro">
          <h2 id='about'>About Us</h2>
          <div>
            <p>Being the agent of distribution companies, CPPA-G has the regulatory obligation of submission of forecasted wholesale electricity prices (monthly references of energy and capacity) to regulate every financial year. We aim to become a world-class power market operator by providing the optimum environment for trading electricity in the Pakistani power market</p>
          </div>
        </section>

        <div>
          <div className="services">
            <div className="service-one" onClick={this.changeToStore}>
              <p className="service-icon"><i className="fas fa-database"></i></p>
              <p className="service-title">Storing</p>
              <p>Stores extensive data in database with improved data preservation, data security, reliability and data retreival speed</p>
            </div>
            <div className="service-two" onClick={this.changeToPred}>
              <p className="service-icon"><i className="fas fa-calculator"></i></p>
              <p className="service-title">Computing</p>
              <p>Makes fast, accurate, relevant computations on the data using EPP,CPP,FCC modules. It also generates the output excel sheets which can be used for easily analysis of the results.</p>

            </div>
            <div className="service-three" onClick={this.changeToVisual}>
              <p className="service-icon"><i className="fas fa-chart-line"></i></p>
              <p className="service-title">Visualizing</p>
              <p>Enables direct interaction with data, a rapid identification of the latest trends, better predictive analysis, easy comprehension of the huge data and a customized data-visualization.  </p>

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
          <h2 id='mission'>Our Mission</h2>
          <div>
            <p>It aims to help CPPA-G (Central power purchasing agency) to handle immense data of the fuel prices, hydrology, transmission network etc. from all over Pakistan</p>
            <p>It can handle extensive data in a more robust way with greater data integrity and independence from applications programs, improved data security, reduced data entry, storage and retrieval costs with an increased consistency. This data is fed into a Wholesale Electricity price forecasting model (5-years horizon) using dispatch optimization tool namely Stochastic Dual Dynamic Programming (SDDP) capturing inter-alia, existing contractual frameworks of various generations, financial settlements, transmission network, load and renewables forecast, Hydrology, Fuel price Forecast etc. It allows CPPA-G to have a direct interaction with data, have a rapid identification of the latest trends, make better predictive analysis, make huge data easily comprehensible and have a customized data-visualization. </p>
          </div>
        </section>


        <section>
          <h2 id='contact'>Contact Us</h2>
          <Form />

        </section>


      </main>
    );
  }
}

export default Main;