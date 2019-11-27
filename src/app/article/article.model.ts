export class Article {

  constructor(
      public id?: number,
      public title?: string,
      public categoryId?: number,
      public text?: string,
      public preview?: string,
      public created?: Date,
      public updated?: Date) { }
}