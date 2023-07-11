import React, { useState, useEffect } from 'react';
import './App.css';
import { Form } from './Form';

function moviesMap(movies) {
  return !movies ? "loading" : movies.map(element => {
    return (
      <tr className='movie'>
        <td>{element.title}</td>
        <td>{element.director}</td>
        <td className='year'>{element.year}</td>
        <td>{element.genres.map((el, ind) => {
          if (ind !== element.genres.length - 1) return (el + ', ')
          else return (el)
        })}</td>
        <td className='rating'>{element.rating}</td>
        <td className='time_table'>
          <p className='hours'>{element.duration.hours}:</p>
          <p className='minutes'>{element.duration.minutes}</p>
        </td>
        <th>
          <button className="del" >&#10060;</button>
        </th>
      </tr>
    )
  })
}



function App() {
  const [movies, setMovies] = useState(null);

  const btnDel = document.querySelectorAll('.del');
  btnDel.forEach((el, i) => {
    el.onclick = () => {
      fetch('/api/movies/' + movies[i]._id, {
        method: 'DELETE'
      })


      fetch('/api/movies')
        .then(response => response.json())
        .then(response => { setMovies(response) })
    }
  })

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(response => { setMovies(response) })

  }, [])
  let settings = document.querySelectorAll('.movie > td');

  let Options = { title: 0, director: 1, year: 2, genres: 3, rating: 4, duration: 5 };
  settings.forEach((el, ind) => {
    el.ondblclick = () => {

      for (const key in Options) {
        let body1;
        if (!((ind - Options[key]) % 6)) {

          el.insertAdjacentHTML('afterend', `<input type='text' class = 'patch'>`);
          const patch = document.querySelector('.patch');
          patch.focus();
          el.style.display = 'none';

          patch.onkeydown = (e) => {
            if (e.code === 'Enter') {
              switch (Options[key]) {
                case 0:
                  body1 = {
                    "title": patch.value
                  }

                  break;
                case 1:
                  body1 = {
                    "director": patch.value
                  }

                  break;
                case 2:
                  body1 = {
                    "year": patch.value
                  }

                  break;
                case 3:
                  body1 = {
                    "genres": patch.value
                  }

                  break;
                case 4:
                  body1 = {
                    "rating": patch.value
                  }

                  break;
                case 5:
                  body1 = {
                    "duration": patch.value
                  }

                  break;
                default:
                  break;

              }
              fetch('/api/movies/' + movies[((ind) - (Options[key])) / 6]._id, {
                method: "PATCH",
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body1)
              })

              el.innerText = (patch.value).split(',');
              el.style.display = 'block';
              patch.remove();
              
            }
          };

        }
      }

    }
    settings = document.querySelectorAll('.movie > td')
  })

  function delAll() {
    fetch('/api/movies/del_all', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({})
    })
  }

  return (
    <div className="App">
      <header className="App-header">

        <Form />
        {/* <p>title</p><p>director</p><></> */}
        <button className='del_All' onClick={delAll}>Удалить все</button>
        <table>
          {moviesMap(movies)}
        </table>
      </header>
    </div>
  );
}

export default App;
