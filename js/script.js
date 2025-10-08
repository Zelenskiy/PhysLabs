// Чи ви впевнені, що хочете завершити виконання роботи та надіслати відповідь?

const server = 'https://AlexZelenskiy.pythonanywhere.com/';
// const server = 'http://127.0.0.1:5000/';
const idTable = '';
const sheetName = document.getElementById('sheetName').value;

const submin_button = document.querySelector("#submin_button");
const textInputs = document.querySelectorAll('textarea, input');


submin_button.addEventListener('click', ()=>{
    console.log('Відправка форми');
    
    const name = document.querySelector(`#name`).value;
    const klas = document.querySelector(`#klas`).value;    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('uk-UA');
    const formattedTime = currentDate.toLocaleTimeString('uk-UA');
    const data = {'date': formattedDate, 
                  'time': formattedTime,
                  'klas': klas,
                  'name': name,                    
                };
    
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');
    const td_hs = document.querySelectorAll('.td_h');

    for (let td_h of td_hs){
        data[td_h.id] = td_h.innerText;
    }
    
    for (let input of inputs){
        data[input.id] = input.value;
    }

    for (let textarea of textareas){
        data[textarea.id] = textarea.value;
    }

    for (let select of selects){
        data[select.id] = select.value;
    }
    console.log(data);
    let mess = ''
    if (name === "") mess +='Ви не вписали своє ім\'я\n';
    if (klas === "") mess +='Ви не вписали свій клас';
    if (mess === "")
        sendText(data);
    else {
            alert(mess + "\nЗаповніть ці поля перед відправкою.");
            window.scrollTo(0, 0);

        }

})

  

function sendText(data) {
    submin_button.disabled = true;
    submin_button.classList.add('disabl')
    // URL серверу, на який ви хочете відправити дані
    const serverUrl = server + 'add_lab/';
    // Об'єкт з налаштуваннями запиту
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
                text: data,
                idTable: idTable,
                sheet: sheetName,
            }
        )
    };

    // Відправлення запиту за допомогою fetch
    fetch(serverUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                submin_button.disabled = false;
                submin_button.classList.remove('disabl')
            }
            return response.json();
        })
        .then(data => {
            console.log('Запит успішно відправлено на сервер', data);
            alert('Роботу відправлено на перевірку.')

        })
        .catch(error => {
            console.error('Сталася помилка під час відправлення запиту:', error);
            alert('Сталася помилка під час відправлення. Спробуйте ще.')
            submin_button.disabled = false;
            submin_button.classList.remove('disabl')
        });
    // alert('Роботу відправлено на перевірку.')
}

// Отримуємо всі textarea та input на сторінці


// Функція, яка викликається при зміні поля вводу
function handleInputChange(event) {
    // Ваш код для обробки події тут
    submin_button.disabled = false;
    submin_button.classList.remove('disabl')
}

// Додаємо обробник подій для кожного textarea та input
textInputs.forEach(function (input) {
    input.addEventListener('input', handleInputChange);    
});


