// Список книг изображаемых изначально
// Имитация данных, полученных от сервера или API
const initialBookList = [
  {
    bookTitle: 'C# in Depth',
    bookAuthor: 'Jon Skeet',
    bookReleaseYear: '2013',
    bookCover:
      'https://images-na.ssl-images-amazon.com/images/I/41prHleW6NL._SX397_BO1,204,203,200_.jpg'
  },
  {
    bookTitle: 'Effective Java',
    bookAuthor: 'Joshua Bloch',
    bookReleaseYear: '2008',
    bookCover:
      'https://images-na.ssl-images-amazon.com/images/I/512uU-1z0qL._SX396_BO1,204,203,200_.jpg'
  },
  {
    bookTitle: 'JavaScript: The Good Parts',
    bookAuthor: 'Jon Skeet',
    bookReleaseYear: '2008',
    bookCover:
      'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg'
  }
];

// Глобально используюемые константы

// Решил сократить document для локаничности
const D = document;

// Корень списка и "образец" элемента для копирования
const bookList = D.getElementById('book-list');
const listItemBluePrint = D.getElementById('list-item-blueprint');

// Форма и поля формы
const formContainer = D.getElementById('popup-container');
const formTitle = D.getElementById('form-title');
const bookInfoForm = D.getElementById('book-info-form');
const bookTitleField = D.getElementById('book-title-field');
const bookAuthorField = D.getElementById('book-author-field');
const bookReleaseYearField = D.getElementById('book-release-year-field');
const bookCoverField = D.getElementById('book-cover-field');

// Кнопки с общей функциональностью

// Кнопка, открыающая форму для добавления элемента
const addButton = D.getElementById('add-item-btn').addEventListener(
  'click',
  () => openFormAdd()
);
// Кнопка, удаляющая элемент
const cancelButton = D.getElementById('cancel-btn').addEventListener(
  'click',
  () => closeForm()
);

// Функция создания элемента
const makeListItem = data => {
  // Копирование образца со всеми детьми и текстом
  const newListItem = listItemBluePrint.cloneNode(true);

  // Присвоение уникального id. Имитация id полученного из БД.
  // Необходимо для последующего нахождения элемента в списке.
  const id = Math.round(Math.random() * 100000);
  newListItem.id = id;

  // Текстовый контент
  newListItem.querySelector('.book-title').innerText = data.bookTitle;
  newListItem.querySelector('.book-author').innerText = data.bookAuthor;
  newListItem.querySelector('.book-release-year').innerText =
    data.bookReleaseYear;

  // URL для обложки. Добавление хэндлера, заменяющего недействительный URL на локально хранимый плэйсхолдер
  const bookCover = newListItem.querySelector('.book-cover');
  bookCover.src = data.bookCover;
  bookCover.addEventListener('error', e => (e.target.src = 'img/book.png'));

  // Присвоение хендлеров для кнопки редактирования и удаления
  // Функции используют id, сгенерированное ранее
  newListItem
    .querySelector('.edit-btn')
    .addEventListener('click', () => openFormEdit(id));
  newListItem
    .querySelector('.delete-btn')
    .addEventListener('click', () => deleteListItem(id));

  return newListItem;
};

// Функции открытия/закрытия формы

// Открытие пустой формы для добавления нового элемента
const openFormAdd = () => {
  // Меняем заголовок формы
  formTitle.innerText = 'Добавить книгу';
  // Вешаем соответсвующий ивент-листенер на форму
  bookInfoForm.addEventListener(
    'submit',
    (handleSubmit = e => {
      e.preventDefault();
      addListItem();
    })
  );
  // Открывем форму путем свитча классов
  formContainer.classList.add('open');
  formContainer.classList.remove('closed');
};

// Открытие формы для редактирования с полями
const openFormEdit = id => {
  // Меняем заголовок формы
  formTitle.innerText = 'Редактировать книгу';
  // Находим элемент по id
  const itemToEdit = D.getElementById(id);
  // Устанавливаем содержание полей формы на значения, полученные из найденного эелемента
  bookTitleField.value = itemToEdit.querySelector('.book-title').innerText;
  bookAuthorField.value = itemToEdit.querySelector('.book-author').innerText;
  bookReleaseYearField.value = itemToEdit.querySelector(
    '.book-release-year'
  ).innerText;
  bookCoverField.value = itemToEdit.querySelector('.book-cover').src;
  // Вешаем соответсвующий ивент-листенер на форму
  bookInfoForm.addEventListener(
    'submit',
    (handleSubmit = e => {
      e.preventDefault();
      updateListItem(id);
    })
  );
  // Открывем форму
  formContainer.classList.add('open');
  formContainer.classList.remove('closed');
};

// Закрытие формы, очистка формы, очистка эвент-листенеров
const closeForm = () => {
  formContainer.classList.add('closed');
  formContainer.classList.remove('open');
  bookInfoForm.removeEventListener('submit', handleSubmit);
  bookInfoForm.reset();
};

// Хендлеры создания, апдейта и удаления книг

// Добавление
const addListItem = () => {
  // Создаем объект из содержания полей формы
  const newItemData = {
    bookTitle: bookTitleField.value,
    bookAuthor: bookAuthorField.value,
    bookReleaseYear: bookReleaseYearField.value,
    bookCover: bookCoverField.value
  };
  // Создаем новый элемент списка из объекта
  const newListItem = makeListItem(newItemData);
  // Добавляем элемент в конец списка
  bookList.appendChild(newListItem);
  // Закрываем форму
  closeForm();
};

// Апдейт
const updateListItem = id => {
  // Находим элемент по id
  const itemToUpdate = D.getElementById(id);
  // Обновляем значения полей на содержание формы
  itemToUpdate.querySelector('.book-title').innerText = bookTitleField.value;
  itemToUpdate.querySelector('.book-author').innerText = bookAuthorField.value;
  itemToUpdate.querySelector('.book-release-year').innerText =
    bookReleaseYearField.value;
  itemToUpdate.querySelector('.book-cover').src = bookCoverField.value;
  // Закрываем форму
  closeForm();
};

// Удаление
const deleteListItem = id => {
  // Находим по id
  itemToDelete = D.getElementById(id);
  // Удаляем. В полноценном приложении здесь был бы запрос к API на удаление из БД
  bookList.removeChild(itemToDelete);
};

// Функция инициализации. Рендер изначального списка книг
const initialize = initialData => {
  initialData.forEach(dataEntry => {
    const listItem = makeListItem(dataEntry);
    bookList.appendChild(listItem);
  });
};

// Инициализация
initialize(initialBookList);
