// Список книг изображаемых изначально.
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
  // Копирование образца со всеми детьми и тестом
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

  // Присвоение хендлеров для кнопщк редактирования и удаления
  // Функции используют id, сгенерированных ранее
  newListItem
    .querySelector('.edit-btn')
    .addEventListener('click', () => openFormEdit(id));
  newListItem
    .querySelector('.delete-btn')
    .addEventListener('click', () => deleteListItem(id));

  return newListItem;
};

// Функции открытия/закрытия формы

// Открытие пустой формы для добаления нового элемента
const openFormAdd = () => {
  formTitle.innerText = 'Добавить книгу';
  bookInfoForm.addEventListener(
    'submit',
    (handleSubmit = e => {
      e.preventDefault();
      addListItem();
    })
  );
  formContainer.classList.add('open');
  formContainer.classList.remove('closed');
};

// Открытие формы для редактирования с полями
const openFormEdit = id => {
  formTitle.innerText = 'Редактировать книгу';
  const itemToEdit = D.getElementById(id);
  bookTitleField.value = itemToEdit.querySelector('.book-title').innerText;
  bookAuthorField.value = itemToEdit.querySelector('.book-author').innerText;
  bookReleaseYearField.value = itemToEdit.querySelector(
    '.book-release-year'
  ).innerText;
  bookCoverField.value = itemToEdit.querySelector('.book-cover').src;
  bookInfoForm.addEventListener(
    'submit',
    (handleSubmit = e => {
      e.preventDefault();
      updateListItem(id);
    })
  );
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
  const newItemData = {
    bookTitle: bookTitleField.value,
    bookAuthor: bookAuthorField.value,
    bookReleaseYear: bookReleaseYearField.value,
    bookCover: bookCoverField.value
  };
  const newListItem = makeListItem(newItemData);
  bookList.appendChild(newListItem);
  closeForm();
};

// Апдейт
const updateListItem = id => {
  const itemToUpdate = D.getElementById(id);
  itemToUpdate.querySelector('.book-title').innerText = bookTitleField.value;
  itemToUpdate.querySelector('.book-author').innerText = bookAuthorField.value;
  itemToUpdate.querySelector('.book-release-year').innerText =
    bookReleaseYearField.value;
  itemToUpdate.querySelector('.book-cover').src = bookCoverField.value;
  closeForm();
};

// Удаление
const deleteListItem = id => {
  itemToDelete = D.getElementById(id);
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
