let currentPage = 1;
let totalPages; 

function getUSers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    .then(function(reponseText) {
        if (reponseText.status !== 200) {
            throw reponseText.status;
        }
        return reponseText.json();
    })
    .then(function(responseData) {
        console.log(responseData);

        const fragment = document.createDocumentFragment();

        responseData.data.forEach(element => {
            let li = document.createElement('li');
            li.classList.add('list-item');


            let span = document.createElement('span');    
            span.textContent = `${element.first_name} ${element.last_name} ${element.email} ${element.id}`;
            
            


            let img = document.createElement('img');
            img.src = element.avatar;
            img.classList.add('image-user');

            li.appendChild(img);
            li.appendChild(span);
            

            fragment.appendChild(li);

        });

        document.getElementById('list').innerHTML = ' ';
        document.getElementById('list').appendChild(fragment);

        totalPages = responseData.total_pages;


    })
    .catch(function(error) {
        if (error == 404) {
            let p = document.createElement('p');
            p.textContent = 'Page Not Found';
            p.style.color = 'red';
    
            document.getElementById('apiUsers').appendChild(p);
        } else if (error == 500) {
            let p = document.createElement('p');
            p.textContent = 'Server Error';
            p.style.color = 'green';
    
            document.getElementById('apiUsers').appendChild(p);
        } else {
            console.log('errori');
        } 
    })
}

document.getElementById('prev').addEventListener('click', function() {
    if (currentPage == 1) {
        return;
    }
    currentPage -= 1;

    getUSers(currentPage);
})

document.getElementById('next').addEventListener('click', function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage += 1;

    getUSers(currentPage);
})

getUSers(currentPage);

