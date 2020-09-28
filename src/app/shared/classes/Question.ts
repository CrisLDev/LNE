export class Question{
    _id?: string;
    title: string;
    content: string;; 
    createdAt: Date;
    user_id: {
        username: string;
        imgUrl:string;
      }
}