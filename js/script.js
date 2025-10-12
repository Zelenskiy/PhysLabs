// Чи ви впевнені, що хочете завершити виконання роботи та надіслати відповідь?

const server = 'https://AlexZelenskiy.pythonanywhere.com/';
// const server = 'http://127.0.0.1:5000/';
const idTable = '';
const sheetName = document.getElementById('sheetName').value;

const submit_button = document.querySelector("#submit_button");
const textInputs = document.querySelectorAll('textarea, input');

function submit_data() {
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
}


submit_button.addEventListener('click', ()=>{
    submit_data();
})



function sendText(data) {
    submit_button.disabled = true;
    submit_button.classList.add('disabl')
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
                submit_button.disabled = false;
                submit_button.classList.remove('disabl')
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
            submit_button.disabled = false;
            submit_button.classList.remove('disabl')
        });
    // alert('Роботу відправлено на перевірку.')
}

// Отримуємо всі textarea та input на сторінці


// Функція, яка викликається при зміні поля вводу
function handleInputChange(event) {
    // Ваш код для обробки події тут
    submit_button.disabled = false;
    submit_button.classList.remove('disabl')
}

// Додаємо обробник подій для кожного textarea та input
textInputs.forEach(function (input) {
    input.addEventListener('input', handleInputChange);    
});

function setupDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        
        if (file) {
            uploadFile(file);
        }
    });
}




