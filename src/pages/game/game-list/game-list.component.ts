import {
  Component,
  OnInit
} from '@angular/core';
import {
  Meta,
  Title
} from '@angular/platform-browser';

import { Http } from '@angular/http'

import {GameService} from "../game.service";

import {Parse} from "../../../cloud/parse"

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  searchText: string = "";
  searchType: string = "name";
  selectGame:any={
    name:"Unselected"
  };
  searchResult:Array<any>;
  games:Array<any>=[];

  getUserClick(ev){
    this.selectGame = ev
    console.log(ev);
  }
 
  sortByAsccending(type="rating") {
    // 参考MDN Array操作的API文档 Array相关方法方法
    this.games.sort((a,b)=>{
      return a[type] - b[type];
    });
  }
  sortByDesccending(type="rating") {
    // 参考MDN Array操作的API文档 Array相关方法
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
    this.games.sort((a,b)=>{
      return b[type] - a[type];
    });
  }
  sortByRadom() {
    // 参考MDN Array操作的API文档 Math相关方法
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
  this.games.forEach((game,index)=>{
    game.tempIndex = Math.random();
  })
    this.sortByAsccending("tempIndex");
  }
  constructor(meta: Meta, title: Title,private http:Http, private gameServ:GameService) {

    let query = new Parse.Query("Game",http)
    query.find().subscribe(data=>{
      console.log(data)
      this.games = data
    })

    // this.gameServ.getGames().subscribe(data=>{
    //   console.log(data)
    // })
    
 
    // Set SEO
    title.setTitle('My Home Page');

    meta.addTags([{
        name: 'author',
        content: 'eddic'
      },
      {
        name: 'keywords',
        content: 'angular 4 tutorial, angular seo'
      },
      {
        name: 'description',
        content: 'This is my great description.'
      },
    ]);
    // end of SEO
  }

  ngOnInit() {}
}
