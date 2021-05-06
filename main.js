var initialData = [{
    "name": "Scarface",
    "point": "5",
    "type": "movie"
}, {
    "name": "Godfather",
    "point": "5",
    "type": "movie"
}, {
    "name": "Carlito's Way",
    "point": "5",
    "type": "series"
}];
$(document).ready(function () {
    var movies = JSON.parse(localStorage.getItem('data')) || initialData
    var theme = localStorage.getItem('themecolor') || 'themebrown'
    var container = $('.filtered-box');
    var listIndex;
    console.log(theme)
    $('body').addClass(theme);

    if (container.length > 0) {
        for (var i = 0; i < movies.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
            <div class=" d-flex justify-content-around align-items-center">
            <span class="item-name">${movies[i].name}</span>
            <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
            </div>
            <div class="movie-point">
              <i class="fas fa-star"></i>
              <span class="point-increase" >${movies[i].point}</span>
            </div>
            <div class="item-evaluation">
              <span>Puan Ver</span>
              <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
              <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
            </div>
          </li>`);
        }
    }

    $('.save-button').click(function () {

        var _name = $('.movie-input-name').val();
        var _point = $('.movie-input-point').val();
        var _type = $('input[name="type"]:checked').val();
        var information = {
            "name": _name,
            "point": _point,
            "type": _type,
        }

        movies.push(information);
        localStorage.setItem('data', JSON.stringify(movies));
    })

    $('body').on('click', '.quantity-plus', function () {
        var span = $(this).parent().prev().find("span");
        var spanText = span.text();
        var val = parseInt(span.text()) + 1
        var index = $(this).parent().parent().index();
        if (span.text() < 10) {
            span.text(val)
            movies[index].point = val;
            localStorage.setItem('data', JSON.stringify(movies));
        }
    })

    $('body').on('click', '.quantity-minus', function () {
        var span = $(this).parent().prev().find("span");
        var spanText = span.text();
        var val = parseInt(span.text()) - 1
        var index = $(this).parent().parent().index();
        if (span.text() > 0) {
            span.text(val)
            movies[index].point = val;
            localStorage.setItem('data', JSON.stringify(movies));
        }
    })

    $('body').on('click', '.trash', function () {
        var _warningTitle = $(this).parent().text();
        listIndex = $(this).parent().parent().index();
        $('.modal-title').text(_warningTitle);
    })

    $('body').on('click', '.warning-delete-button', function () {
        container.find('li').eq(listIndex).remove();
        $('#delete-modal').modal('hide')

        movies.splice(listIndex, 1)
        localStorage.setItem('data', JSON.stringify(movies))
    })
    $('.body-theme-icon').click(function () {
        $('.theme-color-options').animate({
            height: 'toggle',
        }, 200);
    })

    $('.brown').click(function () {
        $('body').removeClass().addClass('themebrown')
        localStorage.setItem('themecolor', 'themebrown')
    })
    $('.blue').click(function () {
        $('body').removeClass().addClass('themeblue')
        localStorage.setItem('themecolor', 'themeblue')
    })
    $('.grey').click(function () {
        $('body').removeClass().addClass('themegrey')
        localStorage.setItem('themecolor', 'themegrey')
    })
    $('.save-button').click(function () {
        $('#create-modal').modal('hide')
    })

    // FİLMLERİ FİLTRELEME
    $('.typemovie').click(function () {
        var filteredMovies = []
        movies.filter(function (item) {
            if (item.type == 'movie') {
                filteredMovies.push(item)
            }
        });

        container.html('');

        for (var i = 0; i < filteredMovies.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
            <div class=" d-flex justify-content-around align-items-center">
            <span class="item-name">${filteredMovies[i].name}</span>
            <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
            </div>
            <div class="movie-point">
              <i class="fas fa-star"></i>
              <span class="point-increase" >${filteredMovies[i].point}</span>
            </div>
            <div class="item-evaluation">
              <span>Puan Ver</span>
              <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
              <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
            </div>
          </li>`);
        }
    })

    // DİZİLERİ FİLTRELEME
    $('.typeseries').click(function () {
        var filteredSeries = []
        movies.filter(function (item) {
            if (item.type == 'series') {
                filteredSeries.push(item);
            }
        })
        container.html('');

        for (var i = 0; i < filteredSeries.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
            <div class=" d-flex justify-content-around align-items-center">
            <span class="item-name">${filteredSeries[i].name}</span>
            <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
            </div>
            <div class="movie-point">
              <i class="fas fa-star"></i>
              <span class="point-increase" >${filteredSeries[i].point}</span>
            </div>
            <div class="item-evaluation">
              <span>Puan Ver</span>
              <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
              <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
            </div>
          </li>`);
        }
    })

    // TÜM TÜRLERİ FİLTRELEME
    $('.typeall').click(function () {
        container.html('')
        for (var i = 0; i < movies.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
            <div class=" d-flex justify-content-around align-items-center">
            <span class="item-name">${movies[i].name}</span>
            <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
            </div>
            <div class="movie-point">
              <i class="fas fa-star"></i>
              <span class="point-increase" >${movies[i].point}</span>
            </div>
            <div class="item-evaluation">
              <span>Puan Ver</span>
              <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
              <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
            </div>
          </li>`);
        }
    })

    // PUANA GÖRE ARTAN SIRALAMA
    $('.increasing-score').click(function () {
        movies.sort(function (a, b) {
            return a.point - b.point
        })

        container.html('')

        for (var i = 0; i < movies.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
             <div class=" d-flex justify-content-around align-items-center">
             <span class="item-name">${movies[i].name}</span>
             <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
             </div>
             <div class="movie-point">
               <i class="fas fa-star"></i>
               <span class="point-increase" >${movies[i].point}</span>
             </div>
             <div class="item-evaluation">
               <span>Puan Ver</span>
               <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
               <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
             </div>
           </li>`);
        }

    })

      // PUANA GÖRE AZALAN SIRALAMA
    $('.decreasing-score').click(function () {
        movies.sort(function (a, b) {
            return b.point - a.point
        })

        container.html('')
        
        for (var i = 0; i < movies.length; i++) {
            container.append(`<li class="d-flex justify-content-between">
            <div class=" d-flex justify-content-around align-items-center">
            <span class="item-name">${movies[i].name}</span>
            <a class="trash" data-toggle="modal" data-target="#delete-modal" href="#"><i class="far fa-trash-alt" ></i></a>
            </div>
            <div class="movie-point">
              <i class="fas fa-star"></i>
              <span class="point-increase" >${movies[i].point}</span>
            </div>
            <div class="item-evaluation">
              <span>Puan Ver</span>
              <a href="#" class="quantity-plus"><i class="fas fa-sort-up"></i></a>
              <a href="#" class="quantity-minus"><i class="fas fa-sort-down"></i></a>
            </div>
          </li>`);
        }
    })


})