export class Testimonial{
  id?: string;
  name: string;
  content: string;; 
  createdAt: Date;
  user_id: {
      username: string;
      imgUrl:string;
    }
}