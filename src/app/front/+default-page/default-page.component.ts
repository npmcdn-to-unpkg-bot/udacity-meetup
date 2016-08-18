import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-default-page',
  templateUrl: 'default-page.component.html',
  styleUrls: ['default-page.component.css']
})
export class DefaultPageComponent implements OnInit {
  public type: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.url[0].path;
  }

}
