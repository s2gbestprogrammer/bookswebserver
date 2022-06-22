const books = require("./books");


// const getAllBooksHandler = () => ({
//     status: 'success',
//     data: {
//       books,
//     },
// });

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

	const filteredBooks = books.filter(book => {
		let keep = true;

		if (name !== undefined)
			keep = book.name.toLowerCase().includes(name.toLowerCase());

		if (reading !== undefined)
			keep =
				reading == 1 ? book.reading === true : book.reading === false;

		if (finished !== undefined)
			keep =
				finished == 1
					? book.finished === true
					: book.finished === false;

		return keep;
	});

	const books_data =
		filteredBooks.length > 0
			? filteredBooks.map(book => {
					return {
						id: book.id,
						name: book.name,
						publisher: book.publisher
					};
			  })
			: books.map(book => {
					return {
						id: book.id,
						name: book.name,
						publisher: book.publisher
					};
			  });

	return h.response(
		{
			status: 'success',
			data: {
				books: books_data
			}
		}
	);
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const book = books.filter((book) => book.id === id)[0];
   
   if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  

const addBookHandler = (request, h) => {

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

    
    if(!name) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })

        
        response.code(400)
        return response
    }

    const id = Math.random().toString(36).substr(2, 9);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = false;

    const newBook = {
        id,name, year, author, summary, publisher, pageCount, readPage,finished, reading,insertedAt,updatedAt,
    }

    books.push(newBook)


    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })

        response.code(400)
        return response
    }

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
    }



    const response = h.response({
        status: 'fail',
        message: "Gagal menambahkan buku. Mohon isi nama buku"
      });
      response.code(500);
      return response;

    
}

const editbookByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
   
    const index = books.findIndex((book) => book.id === id);

    
    if(!name) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })

        
        response.code(400)
        return response
    }

    if(readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })

        response.code(400)
        return response
    }


    if (index !== -1) {
      books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading,updatedAt
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const deletebookByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = books.findIndex((book) => book.id === id);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
   

module.exports = {getAllBooksHandler,getBookByIdHandler, addBookHandler, editbookByIdHandler, deletebookByIdHandler};