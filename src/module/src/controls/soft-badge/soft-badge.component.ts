import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'soft-badge',
  templateUrl: './soft-badge.component.html',
  styleUrls: ['./soft-badge.component.scss']
})
export class SoftBadgeComponent implements OnInit {
  @Input()
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input()
  size: 'mini' | 'small' | 'default' | 'large' = 'default';
  constructor() { }

  ngOnInit() {
  }
}
