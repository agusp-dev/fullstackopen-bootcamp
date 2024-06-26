import PropTypes from 'prop-types'
import { SectionTitle } from './SectionTitle'

export const PersonForm = ({
  name, 
  onChangeName,
  phone,
  onChangePhone,
  onHandleSubmit
}) => (
  <div>
    <SectionTitle title='Add a New'/>
    <form onSubmit={ onHandleSubmit }>
      <div>
        Name: <input value={ name } onChange={ onChangeName } />
      </div>
      <div>
        Phone: <input value={ phone } onChange={ onChangePhone } />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  </div>
)

PersonForm.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
}
