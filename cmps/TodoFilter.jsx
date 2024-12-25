import { SET_FILTER_BY } from "./../store/reducers/todo.reducer.js";

const { useDispatch, useSelector } = ReactRedux
const { useState, useEffect } = React

export function TodoFilter() {
    const dispatch = useDispatch()

    const filterBy = useSelector((state) => state.todoModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // Notify parent
        dispatch({ type: SET_FILTER_BY, filterBy: filterByToEdit})
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance"> Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <label htmlFor="isDone"> Status: </label>
                <select value={isDone} onChange={handleChange} name="isDone" id="isDone">
                    <option value="" disabled>Select an option</option>
                    <option value="">All</option>
                    <option value="true">Not Done</option>
                    <option value="false">Done</option>
                </select>

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}