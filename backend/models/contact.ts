import { Contact } from "./../types/Contact";
import { db } from "../db";
import {  RowDataPacket } from "mysql2";
// Get all posts
export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM contact`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err); 
    }
    const rows = <RowDataPacket[]>result;
    const messages: Contact[] = [];
    rows.forEach((row) => {
      const message: Contact = {
        id: row.id,
        nume: row.nume,
        prenume: row.prenume,
        email: row.email,
        mesaj: row.mesaj,
        data_adaugare: row.dataadaugare
      };
      messages.push(message);
    });
    callback(null, messages);
  });
};