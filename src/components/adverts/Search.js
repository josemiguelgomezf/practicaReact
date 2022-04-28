import './Search.css'

function Search() {
    return (
        <div>
            <select id="tagInput" name="sale" multiple>
                <option>MOTOR</option>
                <option>WORK</option>
                <option>LIFESTYLE</option>
                <option>MOBILE</option>
            </select>
            <input placeholder="name" id="nameInput" type="text" name="name" />
            <div>
                <input placeholder="priceMin" id="priceInputMin" type="number" name="priceMin" />
                <input placeholder="priceMax" id="priceInputMax" type="number" name="priceMax" />
            </div>
            <select id="selectInput" name="sale">
                <option>TODOS</option>
                <option>COMPRA</option>
                <option>VENTA</option>             
            </select>
        </div>
    );
}


export default Search;