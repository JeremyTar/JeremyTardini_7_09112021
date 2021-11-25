import { Subject } from "rxjs"

export class PostService {
  postsSubject = new Subject<any[]>();

  private posts = [
    {
      id: 1,
      title: "Mon nouveau post !",
      descriptionPost: 'Illud autem non dubitatur quod cum esset aliquando virtutum omnium domicilium Roma, ingenuos advenas plerique nobilium, ut Homerici bacarum suavitate Lotophagi, humanitatis multiformibus officiis retentabant.',
      categorie: 'Work'
    },
    {
      id: 2,
      title: "Mon nouveau post !",
      descriptionPost: 'Illud autem non dubitatur quod cum esset aliquando virtutum omnium domicilium Roma, ingenuos advenas plerique nobilium, ut Homerici bacarum suavitate Lotophagi, humanitatis multiformibus officiis retentabant.',
      categorie: "event"
    },
    {
      id: 3,
      title: "Mon nouveau post !",
      descriptionPost: 'Illud autem non dubitatur quod cum esset aliquando virtutum omnium domicilium Roma, ingenuos advenas plerique nobilium, ut Homerici bacarum suavitate Lotophagi, humanitatis multiformibus officiis retentabant.',
      categorie: 'Machine à café'
    },
  ];

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice())
  }
  addPost(title: string, descriptionPost: string, categorie: string) {
    const postObject = {
      id: 0,
      title: "",
      descriptionPost:"",
      categorie: ""
    };
    postObject.title = title;
    postObject.descriptionPost = descriptionPost;
    postObject.categorie = categorie;
    postObject.id = this.posts[(this.posts.length - 1)].id + 1;
    this.posts.push(postObject);
    this.emitPostsSubject();
  }
}