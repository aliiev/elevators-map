import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

import MapPopup from '../components/MapPopup'
import LimitRange from '../components/LimitRange'
import RegionSelect from '../components/RegionSelect'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/leaflet.css'

import elevators from '../data/elevators.json'
import regions from '../data/regions.json'

const MapPage = () => {
  const [docs, setDocs] = useState([])
  const [limit, setLimit] = useState(50)
  const [region, setRegion] = useState('')
  const [filter, setFilter] = useState({ limit: 50, region: [] })

  useEffect(() => {
    setDocs(elevators)
  }, [])

  const handleFilter = () => {
    setFilter({
      limit,
      region: region.split(';')
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          <MapContainer className="map-container border rounded" center={[48.3794, 31.1656]} zoom={6} preferCanvas={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            { docs
              .slice(0, filter.limit)
              .filter(marker => {
                if (filter.region.length > 1)
                  return filter.region.some(el => {
                    return marker.address.toLowerCase().includes(el)
                  })
                else
                  return marker
              })
              .map(marker => (
                <Marker
                  key={ marker._id.$oid } 
                  position={[
                    parseFloat(marker.coords.split(', ')[1]),
                    parseFloat(marker.coords.split(', ')[0]),
                  ]}
                  icon={
                    new Icon({
                      iconUrl: markerIcon,
                      iconSize: [25, 41],
                      iconAnchor: [12.5, 41]
                    })
                  }>
                    <Popup>
                      <MapPopup title={ marker.title } address={ marker.address } storage={ marker.storage } shipment={ marker.shipment } link={ marker.link } />
                    </Popup>
                  </Marker>
              )) }
          </MapContainer>
        </div>
        <div className="col-12 col-md-4 mt-3 mt-md-0">
          <h4 className="display-6 fw-bold">Фильтрация</h4>
          <div className="mb-3">
            <RegionSelect regions={ regions } value={ region } onChange={ value => setRegion(value) } />
          </div>
          <div className="mb-3 p-3 border rounded">
            <LimitRange max={ docs.length } value={ limit } onChange={ value => setLimit(value) } />
          </div>
          <div className="mb-2 text-center">
            <button className="btn btn-primary w-100" onClick={ handleFilter }>Применить <i className="bi-funnel ms-1" /></button>
            <small className="text-muted d-block mt-3">Чем больше меток на карте - тем меньше производительность. Если область выбрана, то лимит можно выкручивать на максимум. Если области не выбраны - ограничивайтесь лимитом в зависимости от характеристик вашего устройства</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage