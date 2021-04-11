import { Rol } from './rol.model';

export class User {
  rol: Rol;
  google: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  img: string;
  uid: string;

  constructor(
    rol: Rol,
    google: boolean,
    createdAt: string,
    updatedAt: string,
    name: string,
    email: string,
    img: string,
    uid: string
  ) {
    this.rol = rol;
    this.google = google;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.email = email;
    this.img = img;
    this.uid = uid;
  }
}
