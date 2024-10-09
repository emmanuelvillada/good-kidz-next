import { MongoClient } from 'mongodb';

// Desactivar la regla de ESLint para permitir 'var' en este contexto
/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
/* eslint-enable no-var */

// Exportar el archivo como un módulo
export {};
