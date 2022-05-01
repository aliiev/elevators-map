const MapPopup = ({ title, address, storage, shipment, link }) => {
  return (
    <div className="card map-popup">
      <div className="card-body">
        <h5 className="card-title fw-bold">{ title }</h5>
        <p className="card-text"><b>Адрес: </b>{ address }</p>
      </div>
      <ul className="list-group list-group-flush border-top border-bottom">
        <li className="list-group-item">
          <b>Единовременное хранение: </b> { storage }
        </li>
        <li className="list-group-item">
          <b>Отгрузка: </b> { shipment }
        </li>
      </ul>
      <div className="card-footer">
        <a className="btn btn-primary btn-sm w-100 text-white" href={ link } target="_blank" rel="noreferrer">Подробнее <i className="bi-info-lg ms-1" /></a>
      </div>
    </div>
  )
}

export default MapPopup