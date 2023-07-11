import React from "react";



function getMovieUser() {
    let genresStr = document.querySelector('.in_genres').value
    let genresArr = genresStr.split(',');

    let body = {

        "title": document.querySelector('.in_title').value,
        "director": document.querySelector('.in_director').value,
        "year": document.querySelector('.in_year').value,
        "genres": genresArr,
        "rating": document.querySelector('.in_rating').value,
        "duration": {
            "hours": document.querySelector('.in_duration_hours').value,
            "minutes": document.querySelector('.in_duration_minutes').value
        },
    }

    return body
}
let Form = () => {
    function checkValidForm() {
        let flag = false;
    
        if(document.querySelector('.in_title').value === '') flag = true;
        if(document.querySelector('.in_director').value === '') flag = true;
        if(document.querySelector('.in_year').value === '') flag = true;
        if(document.querySelector('.in_genres').value === '') flag = true;
        if(document.querySelector('.in_rating').value === '') flag = true;
        if(document.querySelector('.in_duration_hours').value === '') flag = true;
        if(document.querySelector('.in_duration_minutes').value === '') flag = true;
        
        return flag;
    
    }

    let setMovie = () => {

        if (!checkValidForm()) {
            document.querySelector('form').submit();
            fetch('/api/getmovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(getMovieUser())
            })
        }
        if(checkValidForm()) {
            document.querySelector('.time').insertAdjacentHTML('afterend', `<p class="messageErrorValidForm">Не все поля заполнены!</p>`)
        }



    }
    return (
        <form>
            <p>Название: </p>
            <input className='in_title' type='text' />
            <p>Режиссер: </p>
            <input className='in_director' type='text' />
            <p>Год выпуска: </p>
            <input className='in_year' type='number' />
            <p>Жанр: </p>
            <input className='in_genres' type='text' />
            <p>Рейтинг: </p>
            <input className='in_rating' type='number' />
            <div className="time">
                <p>Часы: </p>
                <input className='in_duration_hours' type='number' />
                <p>Минуты: </p>
                <input className='in_duration_minutes' type='number' />
            </div>

            <button type="button" className='btn_add' onClick={setMovie}>Добавить</button>
        </form>
    )
}

export { Form };