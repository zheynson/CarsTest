import {Component, OnInit} from '@angular/core';
import {CarOwner} from '../models/car-owner';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public userId: any;
  todos: CarOwner[] = [];

  constructor(private service: SearchService) {}

  ngOnInit(): any {
    this.service.search().subscribe(t => {
      this.todos = t;
    });
  }

  delete(id): any {
    this.todos = this.todos.filter(t => t.id !== id);
    this.service.deleteUser(id).subscribe((t) => {
      this.service.search();
    });
  }
}
