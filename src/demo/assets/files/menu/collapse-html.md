<div style="max-width: 300px; position: relative;">
  <div style="transition: transform 0.2s; -webkit-transition: transform 0.2s" [ngStyle]="{'transform': isCollapse ? 'translateX(0)' : 'translateX(280px)'}">
    <i class="fa fa-navicon fa-fw" style="cursor: pointer;" (click)="onCollapse()"></i>
  </div>
  <soft-menu [menus]="menus" [collapse]="isCollapse"></soft-menu>
</div>