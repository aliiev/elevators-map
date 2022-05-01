const RegionSelect = ({ regions, value, onChange }) => {
  return (
    <select className="form-select" value={ value } onChange={ e => onChange(e.target.value) }>
      <option value="">Выберите область</option>
      { regions.map(rg => (
        <option key={ rg.title } value={ rg.keywords }>{ rg.title }</option>
      )) }
    </select>
  )
}

export default RegionSelect