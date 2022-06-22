const {getAllBooksHandler, addBookHandler, getBookByIdHandler, editbookByIdHandler, deletebookByIdHandler} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editbookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deletebookByIdHandler
    },
  ];
   
  module.exports = routes;