import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Link } from 'react-router-dom'

import elevators from '../data/elevators.json'
import regions from '../data/regions.json'

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [state, setState] = useState([])

  useEffect(() => {
    setState([])

    regions.forEach(rg => {
      setState(state => [ ...state, {
        title: rg.title,
        count: elevators.filter(elevator => rg.keywords.split(';').some(el => elevator.address.toLowerCase().includes(el))).length
      } ])
    })
  }, [])

  const chartData = {
    labels: state.sort((a, b) => b.count - a.count).map(st => st.title),
    datasets: [{
        label: 'Количество элеваторов',
        data: state.sort((a, b) => b.count - a.count).map(st => st.count),
        backgroundColor: 'rgba(26, 26, 26, 0.1)',
        borderColor: 'rgba(26, 26, 26, 0.1)',
        borderWidth: 2,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        bodyFontSize: 24,
        displayColors: false
      },
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="container">
      <div className="p-3 p-sm-5 bg-light rounded-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <h1 className="display-5 fw-bold">Элеваторы Украины</h1>
              <p className="fs-4">Всего собрано <b className="text-primary">{ elevators.length }</b> элеваторов <br />из <b className="text-primary">{ regions.length }</b> регионов Украины</p>
              <Link className="btn btn-primary btn-lg" to="/map">Перейти к карте <i className="bi-map ms-1" /></Link>
            </div>
            <div className="col-12 col-md-6 my-3 my-md-0" style={{ height: '40vh' }}>
              <Doughnut data={ chartData } options={ chartOptions } />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage