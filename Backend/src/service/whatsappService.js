const Database = require('../database/databaseConnect')

class whatsappService {
    static async getData() {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.pengembalian, borrow.due_date, buku.judul, account.wa, account.name
            FROM borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn
            WHERE borrow.status = $1`,
            values: ['SUKSES']
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }

    static async updatePengembalian(id) {
        await Database.createConnection()
        console.log(id)
        const query = {
            text: `UPDATE borrow SET pengembalian = $1 WHERE id = $2`,
            values: ['selesai', id]
        }
        await Database.query(query)
        await Database.close()
    }
}


module.exports = whatsappService