import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
export const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = e => dispatch(setFilter(e.target.value));
  return (
    <>
      <label htmlFor="findName" className="form-label">
        Find contacts by name
      </label>
      <input
        id="findName"
        type="text"
        name="filter"
        onChange={handleFilterChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </>
  );
};
