import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {

  @Inject(DbService)
  dbService: DbService;

  async list(name: string) {
    const books: Book[] = await this.dbService.read();
    const new_books = books.filter(item => item.name === name)

    return name ? books.filter(book => {
      return book.name.includes(name);
    }) : books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();

    return books.find((item) => item.id == id);
  }

  async create(createBookDto: CreateBookDto) {
    console.log('createBookDto', createBookDto)
    const books: Book[] = await this.dbService.read();
    const book = new Book();

    book.id = randomNum()
    book.author = createBookDto.author
    book.name = createBookDto.name
    book.description = createBookDto.description
    book.cover = createBookDto.cover;
    books.push(book)
    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    console.log('updateBookDto', updateBookDto)
    console.log('typeof', typeof updateBookDto.id)
    const books: Book[] = await this.dbService.read();
    const foundBook = books.find(item => item.id === Number(updateBookDto.id))

    if (!foundBook) {
      throw new BadRequestException('该图书不存在')
    }
    foundBook.author = updateBookDto.author
    foundBook.cover = updateBookDto.cover
    foundBook.description = updateBookDto.description
    foundBook.name = updateBookDto.name

    await this.dbService.write(books)

    return foundBook;
  }

  async delete(id: string | number) {
    console.log('id', id)
    console.log(typeof id)
    const books: Book[] = await this.dbService.read();

    const index = books.findIndex(item => item.id === id)
    console.log('11', index)
    if (index !== -1) {
      books.splice(index, 1)
      await this.dbService.write(books)
    }
  }
}
