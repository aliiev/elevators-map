const LimitRange = ({ max, value, onChange }) => {
  return (
    <>
      <label className="form-label">
        Выберите лимит <span className="badge bg-secondary">{ value }</span>
      </label>
      <input className="form-range" type="range" min={ 0 } max={ max } step={ 1 } value={ value } onChange={ e => onChange(e.target.value) } />
    </>
  )
}

export default LimitRange