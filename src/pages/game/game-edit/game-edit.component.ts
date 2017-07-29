import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service'

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit,OnDestroy {
  gameId:string="";
  game:any={
    name:""
  };
  isNew:boolean = false;

  // Subscribe Declaration
  getGameSubscribe:any;
  
  constructor(private route: ActivatedRoute,
  private gameServ:GameService,
  private location: Location) {
  }
  back(){
    this.location.back();
  }
  save(){
    this.game.review = Number(this.game.review)
    this.game.rating = Number(this.game.rating)
    this.gameServ.saveGame(this.game).subscribe(data=>{
      console.log(data)
      this.location.back();
    })
    this.gameServ.saveGame(this.game).subscribe(data=>{
      console.log(data)
      this.location.back();        
    })
  }
  ngOnInit() {
        this.route.params.subscribe(params=>{
          let id = params['id']
          if(id=="new"){
            let game = {name:""}
            this.isNew = true;
            this.game = game
          }else{
            this.gameServ.getGameById(id).subscribe(game=>{
            console.log(game)
            // this.gameId = game.objectId;
            this.game = game
        })
      }

    })
  }
  ngOnDestroy(){
  }


}
