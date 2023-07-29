import React, { useState, useEffect } from 'react';
import './App.css';
import { Form } from './Form';

function MoviesMap(props) {
  const [movies, setMovies] = useState(null);
  let items;
  if (props.movies != null) {
    items = [...props.movies];
  }
  const moviesDel = (event) => {
    const index = Number(event.target.id);
    fetch('https://movies-lib-2zxy.onrender.com/api/movies/' + items[index]._id, {
      method: 'DELETE'
    })

    setTimeout(() => {
      window.location.reload();
    }, 500)

  }
  // let settings = document.querySelectorAll('.movie > td');

  // let Options = { title: 0, director: 1, year: 2, genres: 3, rating: 4, duration: 5 };
  // settings.forEach((el, ind) => {
  //   const changeParams = () => {

  //     for (const key in Options) {
  //       let body1;
  //       if (!((ind - Options[key]) % 6)) {

  //         el.insertAdjacentHTML('afterend', `<input type='text' class = 'patch'>`);
  //         const patch = document.querySelector('.patch');
  //         patch.focus();
  //         el.style.display = 'none';

  //         patch.onkeydown = (e) => {
  //           if (e.code === 'Enter') {
  //             switch (Options[key]) {
  //               case 0:
  //                 body1 = {
  //                   "title": patch.value
  //                 }

  //                 break;
  //               case 1:
  //                 body1 = {
  //                   "director": patch.value
  //                 }

  //                 break;
  //               case 2:
  //                 body1 = {
  //                   "year": patch.value
  //                 }

  //                 break;
  //               case 3:
  //                 body1 = {
  //                   "genres": patch.value
  //                 }

  //                 break;
  //               case 4:
  //                 body1 = {
  //                   "rating": patch.value
  //                 }

  //                 break;
  //               case 5:
  //                 body1 = {
  //                   "duration": patch.value
  //                 }

  //                 break;
  //               default:
  //                 break;

  //             }
  //             fetch('https://movies-lib-2zxy.onrender.com/api/movies/' + movies[((ind) - (Options[key])) / 6]._id, {
  //               method: "PATCH",
  //               headers: {
  //                 'Content-Type': 'application/json;charset=utf-8'
  //               },
  //               body: JSON.stringify(body1)
  //             })

  //             el.innerText = (patch.value).split(',');
  //             el.style.display = 'block';
  //             patch.remove();

  //           }
  //         };

  //       }
  //     }

  //   }

  // })

  const changeParams = (event) => {
    let el = event.target;
    let name = el.className;
    let body1;
    console.log(el);
    el.insertAdjacentHTML('afterend', `<input type='text' class = 'patch'>`);
    el.style.display = 'none';
    const patch = document.querySelector('.patch');
    
    patch.focus();
   
    patch.onkeydown = (e) => {
      let flag = false;
                if (e.code === 'Enter') {
                  switch (name) {
                    case "title":
                      body1 = {
                        "title": patch.value
                      }
                      flag = true;
                      break;
                    case "director":
                      body1 = {
                        "director": patch.value
                      }
                      flag = true;                  
                      break;
                    case "year":
                      body1 = {
                        "year": patch.value
                      }
                      flag = true;
                      break;
                    case "genres":
                      body1 = {
                        "genres": patch.value
                      }
                      flag = true;
                      break;
                    case "rating":
                      body1 = {
                        "rating": patch.value
                      }
                      flag = true;
                      break;
                    case "duration":
                      body1 = {
                        "duration": patch.value
                      }
                      flag = true;
                      break;
                    default:
                      break;
    
                  }
                }
                if (flag) {
                  fetch('https://movies-lib-2zxy.onrender.com/api/movies/' + items[Number(el.parentNode.id)]._id, {
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
              }
     
  
    
   
  }
  return !props.movies ? "loading" : props.movies.map((element, index) => {
    return (
      <tr className='movie' id={index}>
        <td onDoubleClick={changeParams} className='title'>{element.title}</td>
        <td onDoubleClick={changeParams} className='director'>{element.director}</td>
        <td onDoubleClick={changeParams} className='year'>{element.year}</td>
        <td onDoubleClick={changeParams} className='genres'>{element.genres.map((el, ind) => {
          if (ind !== element.genres.length - 1) return (el + ', ')
          else return (el)
        })}</td>
        <td onDoubleClick={changeParams} className='rating'>{element.rating}</td>
        <td className='time_table'>
          <p onDoubleClick={changeParams} className='hours'>{element.duration.hours}:</p>
          <p onDoubleClick={changeParams} className='minutes'>{element.duration.minutes}</p>
        </td>
        <th>
          <button type="sumbit" className="del" onClick={moviesDel} id={index}>&#10060;</button>
        </th>
      </tr>
    )
  })
}



function App() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch('https://movies-lib-2zxy.onrender.com/api/movies')
      .then(response => response.json())
      .then(response => { setMovies(response) })

  }, [])


  const delAll = () => {
    fetch('https://movies-lib-2zxy.onrender.com/api/movies/del_all', {
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
          <MoviesMap movies={movies} />
        </table>
      </header>
    </div>
  );
}

export default App;
